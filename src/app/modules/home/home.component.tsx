import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getPosts } from "@/app/store/post/post.action";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import ListPosts from "@/app/components/post/list-posts";
import CreatePost from "@/app/components/post/create-post";

const HomePage: React.FC = () => {
  const { token, account } = useSelector(userSelector);
  const { isLoading, posts } = useSelector(postSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    token && dispatch(getPosts(token));
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
        <ListPosts isLoading={isLoading} posts={posts} />
      </div>
    </Layout>
  );
};

const userSelector = (state: GlobalState) => state.user;
const postSelector = (state: GlobalState) => state.post;

export default HomePage;
