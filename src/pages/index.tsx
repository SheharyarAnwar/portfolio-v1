import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ElasticAnimatableText,
  Button,
  ProjectCard,
  BlogCard,
  Globe,
  // Tendrils,
} from "../components";
// const Globe = dynamic(() => import("../components/Globe"));
import { socialLinks } from "../constants";
import { useBreakpoints } from "../hooks";
import { Section, Container } from "../layouts";
import {
  getAllFilesFrontMatter,
  getAllPortfolioFilesData,
  GreyMatter,
  Portfolio,
} from "../lib/mdx";
import { useInView } from "react-intersection-observer";
import {
  ElasticAnimatableTextProps,
  HeadingLevels,
} from "../components/ElasticAnimatableText";

const Home: NextPage<{ posts: GreyMatter[]; projects: Portfolio[] }> = ({
  posts,
  projects,
}) => {
  const introHeading: Partial<ElasticAnimatableTextProps>[] = [
    { text: "Hi", level: 1 },
    { text: "I'm Sherry,", level: 1 },
    {
      inlineStaggerDelay: 25,
      text: "I build exceptional digital experience for web",
      containerClassName: "mt-4 text-gray-300",
      level: 3,
    },
  ];
  const { queryBreakpoints } = useBreakpoints();
  const { ref, inView } = useInView();

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
      <Container>
        {/* {!queryBreakpoints("lg") && <Tendrils options={{}} />} */}
        <section className="relative h-[calc(100vh-8rem)]  flex items-center">
          <div className="inline-block text-left pb-8">
            {introHeading.map((val, i) => {
              return (
                <ElasticAnimatableText
                  key={i}
                  stagger
                  blockStagger
                  previousBlockSize={introHeading[i - 1]?.text?.length || 0}
                  {...(val as ElasticAnimatableTextProps)}
                />
              );
            })}

            <div className="mt-8">
              <p className="tracking-widest text-grey">
                Full Stack Web Developer / React Specialist
              </p>
              <a
                className="m-auto"
                href={`mailto:${socialLinks.email}`}
                rel="noopener noreferrer"
              >
                <Button className=" mt-10">Get In touch</Button>
              </a>
            </div>
          </div>
        </section>
        <Section title="About Me">
          <div className="grid grid-cols-12 ">
            <div className=" pt-16 pb-8 col-span-12 xl:col-span-6">
              <p>
                Hi! I am Sheharyar Anwar and I am a web developer based in{" "}
                <mark>Pakistan</mark>. I am in love with web platform and I
                consider myself blessed to be able to work on it for a living.
              </p>
              <p className="my-6">
                I have a Bachelor&apos;s degree in Computer Sciences, which I
                got in 2021 and have been involved in web development since 2020
                when I started my career as a freelance developer.
              </p>
              <p className="mb-6">
                I like to create digital experiences and products with focus on{" "}
                <mark>accessibility</mark>, <mark>performance</mark> and{" "}
                <mark>responsive design</mark> using cutting edge technologies.
              </p>
              <p>
                When I am not working, I like to indulge myself with cats,
                anime, web novels and scientific documentaries.{" "}
              </p>
            </div>
            <div
              ref={ref}
              className="flex items-center justify-center xl:justify-end col-span-12 xl:col-span-6"
            >
              {inView && <Globe radius={radius} />}
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
          <Link href={`/portfolio`}>
            <a className="m-auto">
              <Button>See More</Button>
            </a>
          </Link>
        </Section>
        <Section title="Featured Articles">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-10 py-16">
            {filterRecentPosts.map((val, i) => {
              return <BlogCard key={i} {...val} />;
            })}
            {/* <BlogCard></BlogCard>
            <BlogCard></BlogCard> */}
          </div>
          <Link href={`/blog`}>
            <a className="m-auto">
              <Button>See More</Button>
            </a>
          </Link>
        </Section>
        {/* <Section title="Contact Me">
          <p className="py-16 text-center">
            I’m currently looking for remote jobs or freelance opportunities. If
            you have any questions feel free to reach out to me.
          </p>
          <a
            className="m-auto"
            href={`mailto:${socialLinks.email}`}
            rel="noopener noreferrer"
          >
            <Button>Say Hello!</Button>
          </a>
        </Section> */}
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
