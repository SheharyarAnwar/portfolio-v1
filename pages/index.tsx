import type { NextPage } from "next";
import Head from "next/head";
import {
  ElasticAnimatableText,
  Button,
  Container,
  ProjectCard,
  BlogCard,
} from "../components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="h-screen flex items-center">
          <section className="inline-block">
            <ElasticAnimatableText level={1} text={"Hi"} />
            <ElasticAnimatableText level={1} text={"I'm Sherry,"} />
            <ElasticAnimatableText level={1} text={"web developer"} />
            <div className="mt-8">
              <p className="tracking-widest text-grey">
                Full Stack Developer / React Expert
              </p>
              <Button className=" mt-16">Contact Me</Button>
            </div>
          </section>
        </div>
        <section className="my-24">
          <h2 className="text-green">About me</h2>
          <div className="block m-auto lg:flex ">
            <div className="w-full lg:w-1/2 py-16 lg:pr-16">
              <p className=" ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                ab vero corrupti quam soluta cupiditate deleniti. Sapiente quae
                dolore fugiat. Modi cupiditate, consectetur quasi natus est
                fugit amet voluptate blanditiis.
              </p>
              <p className=" ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
                ab vero corrupti quam soluta cupiditate deleniti. Sapiente quae
                dolore fugiat. Modi cupiditate, consectetur quasi natus est
                fugit amet voluptate blanditiis.
              </p>
            </div>
            <div className="w-1/2 py-16 ">
              <div className="bg-green w-full h-full "></div>
            </div>
          </div>
        </section>
        <section className="my-24 flex flex-col">
          <h2 className="text-green mb-12">My projects</h2>
          <ProjectCard />
          <ProjectCard reversed />
          <ProjectCard />
          <Button className="m-auto">See More</Button>
        </section>
        <section className="my-24 flex flex-col">
          <h2 className="text-green mb-12">Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-10">
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
          </div>
          <Button className="m-auto">See More</Button>
        </section>
      </Container>
    </>
  );
};

export default Home;
