import Head from 'next/head'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row } from 'react-bootstrap';
import Layout from '../Components/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function Account ({ data }) {
    const myDetails = data?.data
    const MyRepository = data?.repos
    console.log('data', data?.repos)
    const router = useRouter();
  
    useEffect(()=>{
        if(myDetails?.message === 'Not Found' || myDetails?.message =="API rate limit exceeded for 103.156.142.125. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"){
            router.push('/')
        }
    },[data, myDetails, router])

    const myLoader = ({ src }) => {
        return `${myDetails.avatar_url}`;
    }

    return (
        <Layout>
        <>
            <Head>
             <title>{myDetails?.name}</title>
            </Head>

            <div className='account'>
             <h1>{myDetails?.name}</h1>
                <Image
                    loader={myLoader}
                    src={`${myDetails.avatar_url}`}
                    alt="Picture of the author"
                    width={300}
                    height={300}
                />
                    <h3 className='mt-5'>Bio:- {myDetails?.bio}</h3>
                    <h4 className='mt-3'>followers:- {myDetails?.followers}</h4>
                    <h4 className='mt-3'>Total Repos:- {myDetails?.public_repos}</h4>

                    <Card style={{ width: '50rem' }} className='mt-3 mb-4'>
                    <Card.Header>My Repos</Card.Header>
                    <ListGroup variant="flush">
                    {MyRepository?.map((item)=>{
                        return <ListGroup.Item key={item?.id}>
                            <Row>Project Title:- {item?.name} </Row>
                            <Row>Project Url:- {item?.html_url} </Row>
                            </ListGroup.Item>
                    })}
                    </ListGroup>
                    </Card> 

                    
            </div>
        </>
        </Layout>
    )
}

export async function getServerSideProps ({ query }) {
    const Udata = query.data
    try {
        const res = await fetch(`${process.env.baseURL}users/${Udata}`, { method: 'GET' });
        const data = await res.json();
      
        if(data?.login){
            const response = await fetch(`${process.env.baseURL}users/${Udata}/repos`, { method: 'GET' });
            const repodataData = await response.json(); 
            return {
                props:  {data:{
                    data:data,
                    repos:repodataData
                }},
            };
        }else{
            return{
                props: {data}
            }
        }
        
    } catch (error) {
         return console.error('Error:', error);
      }
  
}