import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, GlobalState } from "@/app/store/global.store";
import { getBookmarkPosts } from "@/app/store/post/post.action";
import Layout from "@/app/components/layout";
import Head from "@/app/components/head";
import ListPosts from "@/app/components/post/list-posts";

const BookmarksPage: React.FC = () => {
  const { token, account } = useSelector(userSelector);
  const { isLoading, posts } = useSelector(postSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    token && dispatch(getBookmarkPosts(token));
  }, [dispatch, token]);

  return (
    <Layout>
      <div className="flex flex-col">
        <Head
          account={account}
          user={null}
          studentIDParam=""
          headline="Bookmarks"
          isArrowBack="false"
        />
        <div className="flex flex-col w-full max-w-600px mx-auto">
          <div className="flex flex-col">
            {account && account.bookmark.length > 0 ? (
              <ListPosts isLoading={isLoading} posts={posts} />
            ) : (
              <div
                className="flex flex-col w-full self-center my-8 mx-auto px-8"
                style={{ maxWidth: "calc(400px)" }}
              >
                <div className="mb-2 text-4xl font-bold break-words leading-9">
                  <span>You haven’t added any Posts to your Bookmarks yet</span>
                </div>
                <div className="mb-7 break-words">
                  <span>When you do, they’ll show up here.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const userSelector = (state: GlobalState) => state.user;
const postSelector = (state: GlobalState) => state.post;

export default BookmarksPage;
