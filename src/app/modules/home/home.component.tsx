import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getPosts } from "@/app/store/post/post.action";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import ListPosts from "@/app/components/post/list-posts";
import CreatePost from "@/app/components/post/create-post";
import Loader from "@/app/components/loader";

const HomePage: React.FC = () => {
  const { token, account } = useSelector(userSelector);
  const { posts } = useSelector(postSelector);

  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(true);
    token && dispatch(getPosts(token)).then(() => setLoading(false));
  }, [dispatch, token]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head
          account={null}
          user={null}
          studentIDParam=""
          headline="Home"
          isArrowBack="false"
        />
        {account && (
          <CreatePost
            textInButton="Create post"
            postType="create-post"
            editorOptions={{ placeholder: "What's happening?" }}
          />
        )}
        <div className="flex flex-col relative">
          <ListPosts posts={posts} />
          {isLoading && <Loader />}
        </div>
      </div>
    </Layout>
  );
};

const userSelector = (state: GlobalState) => state.user;
const postSelector = (state: GlobalState) => state.post;

export default HomePage;
