import { instagramPosts, instagramEmbeds, type InstaPost } from "@/lib/content/instagram";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import InstagramWidget from "@/components/social/InstagramWidget";
import InstagramEmbeds from "@/components/social/InstagramEmbeds";
import { getInstagramPosts } from "@/lib/instagram";
import { site, social } from "@/lib/site";

const typeLabel: Record<InstaPost["type"], string> = {
  image: "Photo",
  reel: "Reel",
  carousel: "Carousel",
};

function FollowButton() {
  return (
    <div className="mt-6">
      <a
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
      >
        Follow @{site.instagramHandle}
      </a>
    </div>
  );
}

/** The site's own editorial gallery, used for both live API posts and the curated fallback. */
function Gallery({ posts }: { posts: InstaPost[] }) {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {posts.map((post, i) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-[70vw] shrink-0 snap-start sm:w-[42vw] md:w-[24rem]"
        >
          <MediaPlaceholder
            image={post.image}
            label={typeLabel[post.type]}
            index={i}
            className="aspect-[4/5] w-full"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent">
              {typeLabel[post.type]}
            </span>
            {post.caption && (
              <p className="mt-1 line-clamp-2 text-sm text-bone">{post.caption}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

/**
 * Instagram section with graceful degradation:
 *   1. Live Graph API feed (INSTAGRAM_ACCESS_TOKEN) rendered in our own grid.
 *   2. Live third-party widget (NEXT_PUBLIC_INSTAGRAM_WIDGET_ID).
 *   3. Official post embeds when `instagramEmbeds` lists post URLs.
 *   4. Curated editorial gallery.
 */
export default async function InstagramFeed() {
  // 1) Live official API — real posts in the site's own styled gallery.
  const live = await getInstagramPosts(8);
  if (live && live.length > 0) {
    return (
      <div>
        <Gallery posts={live} />
        <FollowButton />
      </div>
    );
  }

  // 2) Live auto-updating widget.
  const widgetId = process.env.NEXT_PUBLIC_INSTAGRAM_WIDGET_ID;
  if (widgetId) {
    return (
      <div>
        <InstagramWidget widgetId={widgetId} />
        <FollowButton />
      </div>
    );
  }

  // 3) Official post embeds — no login/API, just a list of post URLs.
  if (instagramEmbeds.length > 0) {
    return (
      <div>
        <InstagramEmbeds permalinks={instagramEmbeds} />
        <FollowButton />
      </div>
    );
  }

  // 4) Curated editorial fallback.
  return (
    <div>
      <Gallery posts={instagramPosts} />
      <FollowButton />
    </div>
  );
}
