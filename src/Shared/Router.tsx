import React from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import MainPage from "../Pages/MainPage"
import DetailPage from "../Pages/DetailPage"
import ErrorPage from "../Pages/ErrorPage"
import PointShopPage from "../Pages/PointShopPage"
import SigninPage from "../Pages/SigninPage"
import NoticePage from "../Pages/Post/NoticePage"
import QnAPage from "../Pages/Post/QnAPage"
import SearchResultPage from "../Pages/Post/SearchResultPage"
import TipPage from "../Pages/Post/TipPage"
import TogetherPage from "../Pages/Post/TogetherPage"
import WritePage from "../Pages/Post/WritePage"
import FollowPage from "../Pages/MyPages/FollowPage"
import MyLetterPage from "../Pages/MyPages/MyLetterPage"
import MyLikePage from "../Pages/MyPages/MyLikePage"
import MyPostPage from "../Pages/MyPages/MyPostPage"
import MyProfilePage from "../Pages/MyPages/MyProfilePage"
import OtherPostPage from "../Pages/MyPages/OtherPostPage"
import ProfilePage from "../Pages/MyPages/ProfilePage"
import Layout from "./Layout"
import EditMyProfilePage from "../Pages/MyPages/EditMyProfilePage"
import EditDetailPage from "../Pages/EditDetailPage"

function Router(): any {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<WritePage />} /> */}
          <Route path="/DetailPage/:id" element={<DetailPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/PointShopPage" element={<PointShopPage />} />
          <Route path="/SigninPage" element={<SigninPage />} />
          <Route path="/NoticePage" element={<NoticePage />} />
          <Route path="/QnAPage" element={<QnAPage />} />
          <Route path="/SearchResultPage" element={<SearchResultPage />} />{" "}
          <Route path="/TipPage" element={<TipPage />} />
          <Route path="/TogetherPage" element={<TogetherPage />} />
          <Route path="/WritePage/:board" element={<WritePage />} />
          <Route path="/FollowPage" element={<FollowPage />} />
          <Route path="/MyLetterPage" element={<MyLetterPage />} />
          <Route path="/MyLikePage" element={<MyLikePage />} />
          <Route path="/MyPostPage" element={<MyPostPage />} />
          <Route path="/MyProfilePage" element={<MyProfilePage />} />
          <Route path="/OtherPostPage" element={<OtherPostPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/EditMyProfilePage" element={<EditMyProfilePage />} />
          <Route path="/EditDetailPage/:id" element={<EditDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
