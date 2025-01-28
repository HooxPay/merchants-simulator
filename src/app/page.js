import MainScreenView from "@/components/MainScreenView/MainScreenView"
import { getIndustriesNamesArray } from "./UIDataSource/dataSource"

const Home = () => {
  const industriesArray = getIndustriesNamesArray()
  return (
    <MainScreenView industriesArray={industriesArray}/>
  )
}

export default Home