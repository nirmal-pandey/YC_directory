import {defineQuery} from 'next-sanity';

export const STARTUPS_QUERY =
defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || category match $search || title match $search  || author->name match $search] | order(_createdAt desc) {
  _id ,
    title,
    _createdAt ,
    slug , 
    author->{
      _id , bio , name,image
    } ,
    views ,
    description ,
    category ,
    image
}`);

export const STARTUP_BY_ID_QUERY =
defineQuery(`*[_type=="startup" && _id==$id][0]{
  _id ,
    title,
    _createdAt ,
    slug , 
    author->{
      _id , bio , name,image
    } ,
    views ,
    description ,
    category ,
    image,
    pitch,
}`)

export const STARTUP_VIEWS_QUERY =
defineQuery( `*[_type=="startup" && _id==$id][0]{
  _id , views
  }`)

  export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);
