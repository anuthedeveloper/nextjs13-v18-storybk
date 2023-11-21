import Head from 'next/head';
import Layout from '../components/Layout';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react';

interface PageProps {
  story: any
}

export default function Page({ story }: PageProps ) {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>{story ? story.name : 'My Site'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <StoryblokComponent blok={story.content} />
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params } : any) {
  try {
    let slug = params.slug ? params.slug.join('/') : 'home';

    let sbParams: any = {
      version: 'draft', // or 'published'
    };

    const storyblokApi = getStoryblokApi();
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

    return {
      props: {
        story: data ? data.story : false,
        key: data ? data.story.id : false,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true
    };
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get('cdn/links/', {
    version: 'draft',
  });

  let paths: { params: { slug: any; } }[] = [];

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === 'home') {
      return;
    }

    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split('/');

    // console.log(paths)

    // paths.push({ params: { slug: splittedSlug } });
    paths.push({ params: { slug: splittedSlug } }); // Add a unique key
  });

  return {
    paths: paths,
    fallback: false,
  };
}



