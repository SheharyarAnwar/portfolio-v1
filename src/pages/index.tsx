import type { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import {
  ElasticAnimatableText,
  Button,
  ProjectCard,
  BlogCard,
  Globe,
  Tendrils,
} from "../components";
import { useBreakpoints } from "../hooks";
import { Section, Container } from "../layouts";
import {
  getAllFilesFrontMatter,
  getAllPortfolioFilesData,
  GreyMatter,
  Portfolio,
} from "../lib/mdx";

const Home: NextPage<{ posts: GreyMatter[]; projects: Portfolio[] }> = ({
  posts,
  projects,
}) => {
  const introHeading = ["Hi", "I'm Sherry,", "web developer"];
  const { queryBreakpoints } = useBreakpoints();
  // console.log(projects);

  let radius = 400 / 1.5;
  if (queryBreakpoints("lg")) {
    radius = 300 / 1.5;
  }
  if (queryBreakpoints("xs")) {
    radius = 190 / 1.5;
  }
  const filterRecentPosts = useMemo(() => {
    return posts
      .sort(
        (a, b) =>
          Number(new Date(a.publishDate)) - Number(new Date(b.publishDate))
      )
      .slice(0, 2);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Tendrils options={{}} />
        <section className="relative h-[calc(100vh-8rem)]  flex items-center">
          <div className="inline-block text-left pb-8">
            {introHeading.map((val, i) => {
              return (
                <ElasticAnimatableText
                  key={i}
                  level={1}
                  text={val}
                  stagger
                  blockStagger
                  previousBlockSize={introHeading[i - 1]?.length || 0}
                />
              );
            })}

            <div className="mt-8">
              <p className="tracking-widest text-grey">
                Full Stack Developer / React Expert
              </p>
              <Button className=" mt-10">Contact Me</Button>
            </div>
          </div>
        </section>
        <Section title="About Me">
          <div className="grid grid-cols-12">
            <p className=" pt-16 pb-8 col-span-12 xl:col-span-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              ab vero corrupti quam soluta cupiditate deleniti. Sapiente quae
              dolore fugiat.
            </p>
            <div className="flex items-center justify-center xl:justify-end col-span-12 xl:col-span-6">
              <div>{<Globe radius={radius} />}</div>
            </div>
          </div>
        </Section>
        <Section title="Featured Projects">
          {projects.map((val, i) => {
            let reversed = i % 2 === 0;

            return val.featured ? (
              <ProjectCard key={i} {...val} reversed={!reversed} />
            ) : null;
          })}
          <Button className="m-auto">See More</Button>
        </Section>
        <Section title="Featured Articles">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-10 py-16">
            {filterRecentPosts.map((val, i) => {
              return <BlogCard key={i} {...val} />;
            })}
            {/* <BlogCard></BlogCard>
            <BlogCard></BlogCard> */}
          </div>
          <Button className="m-auto">See More</Button>
        </Section>
        <Section title="Contact Me">
          <p className="py-16">
            I’m interested in freelance opportunities – especially ambitious or
            large projects. However, if you have other request or question,
            don’t hesitate to use the form.
          </p>
          <Button className="m-auto">Say Hello!</Button>
        </Section>
      </Container>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const post = await getAllFilesFrontMatter("blog");
  const projects = await getAllPortfolioFilesData();

  return { props: { posts: post, projects } };
}
