import { useEffect } from 'react';
import TopHeader from '../doms/TopHeader';

export default function Orders(){
    useEffect(()=>{
        // fetch orders that are not delivered
    },[]);
    return (
        <>
            <TopHeader text_content="Orders" noBack />
        </>
    );
}