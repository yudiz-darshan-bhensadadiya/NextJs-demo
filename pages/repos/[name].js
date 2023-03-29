import Layout from "../../Components/Layout";

export async function getStaticPaths(context) {

            console.log('id', context)

            const response = await fetch(`${process.env.baseURL}users/darshan1210/repos`, { method: 'GET' });
            const repodataData = await response.json(); 
            const paths=repodataData.map(({name}) => { return { params: { name }}})
          // console.log('paths', paths)
            return{
                paths,
                fallback: false 
            }
  }
  

  export async function getStaticProps({params}) {

    return {
      props: { params },
    }
  }


  
  export default function Post({params}) {
            return(
                <Layout>
                 <>{params.name}</>
                </Layout>
)
  }