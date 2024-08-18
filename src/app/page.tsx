import { ErrorBoundary, GlobalError } from 'next/dist/client/components/error-boundary';
import Posts from "@/components/Posts/Posts";
import {Suspense} from "react";
import Loading from "@/components/common/Loading/Loading";

export default async function Home() {

  return (
    <ErrorBoundary errorComponent={GlobalError}>
        <Suspense fallback={<Loading isLoading={true}/>}>
            <main className={'container mx-auto'}>
                <Posts/>
            </main>
        </Suspense>
    </ErrorBoundary>
  );
}
