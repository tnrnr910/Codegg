import React from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import MainPage from "../Pages/MainPage"
import DetailPage from "../Pages/DetailPage"
import ErrorPage from "../Pages/ErrorPage"
import PointShopPage from "../Pages/PointShopPage"
import MyItemsPage from "../Pages/MyItemsPage"
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
import Layout from "./Layout"
import EditMyProfilePage from "../Pages/MyPages/EditMyProfilePage"
import EditDetailPage from "../Pages/EditDetailPage"
import OtherProfilePage from "../Pages/MyPages/OtherProfilePage"
import OtherPostPage from "../Pages/MyPages/OtherPostPage"
import AdminPage from "../Pages/MyPages/AdminPage"
import AdminPostPage from "../Pages/MyPages/AdminPostPage"
import AdminReportpostPage from "../Pages/MyPages/AdminReportpostPage"
import AdminLetterPage from "../Pages/MyPages/AdminLetterPage"

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
          <Route path="/MyItemsPage" element={<MyItemsPage />} />
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
          <Route
            path="/OtherProfilePage/:email"
            element={<OtherProfilePage />}
          />
          <Route path="/OtherPostPage/:email" element={<OtherPostPage />} />
          <Route path="/EditMyProfilePage" element={<EditMyProfilePage />} />
          <Route path="/EditDetailPage/:id" element={<EditDetailPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/AdminPostPage" element={<AdminPostPage />} />
          <Route
            path="/AdminReportpostPage"
            element={<AdminReportpostPage />}
          />
          <Route path="/AdminLetterPage" element={<AdminLetterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
