import Banner from "@/components/MainBanner"
import Header from "@/components/Header"
import LandingPage from "@/components/LandingPage"
// app/page.js
export default function Home() {
  return (
    <div>
      <Header/>
      <Banner/>
      <LandingPage/>
    </div>
  )
}