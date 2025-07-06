import Image from "next/image";
import SearchForm from "../../components/searchform";
import  StartupCard ,{StartupTypeCard} from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch , SanityLive } from "@/sanity/lib/live";
import {auth} from '@/auth'


export default async function Home({searchParams}:{
  searchParams: Promise<{query?: string}>;
}) {

  console.log("Running Fine");
  const query = (await searchParams).query; 
  console.log("Search query:", query);

  const params = { search : query || null};
  console.log("Search params :", params);
  const { data : posts } = await sanityFetch({ query: STARTUPS_QUERY , params });

  const session = await auth();

  console.log(session?.id);
 
  return (
    <>

        <section className=" pink_container ">
            <h1 className="heading ">Pitch your startup, <br /> Connect with Enterprenurs
            </h1>

            <p className="sub-heading !max-w-3xl">Submit Ideas , Vote on piches , and Get Notices in Virtuals Competitions.</p>

            <SearchForm query={query} ></SearchForm>

        </section>

        <section className="section_container">

            <p className="text-30-semibold">

                {query ? `Search Results Showing for "${query}"` : "All Startups"}
            </p>

            <ul className=" mt-7 card_grid  ">

                {posts?.length > 0 ? (
                  posts.map((post:StartupTypeCard,index:number) => (<StartupCard key={post?._id} post={post}/>))
                ):( <p className="no-results">No startups Found</p>)}

            </ul>
        </section>
        <SanityLive/>
    </>
    
  )
}

