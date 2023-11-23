// pages/posts/[slug].js

// Dummy data representing blog post slugs
const dummyBlogPosts = [
    { slug: 'post-1', title: 'Blog Post 1' },
    { slug: 'post-2', title: 'Blog Post 2' },
    { slug: 'post-3', title: 'Blog Post 3' },
  ];
  
  export async function getStaticPaths() {
    // Generate paths based on the dummy data
    const paths = dummyBlogPosts.map((post) => ({
      params: { slug: post.slug },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params }) {
    // Fetch data for the specific blog post based on the slug
    const selectedPost = dummyBlogPosts.find((post) => post.slug === params.slug);
  
    return {
      props: {
        data: selectedPost,
      },
    };
  }
  
  function BlogPost({ data }) {
    // Render the blog post using the fetched data
    return (
      <div>
        <h1>{data.title}</h1>
        {/* Other components rendering blog post content */}
      </div>
    );
  }
  
  export default BlogPost;
  