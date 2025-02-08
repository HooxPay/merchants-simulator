import MainScreenView from '@/components/MainScreenView/MainScreenView';
import { getIndustriesNamesArray } from './UIDataSource/dataSource';

const Home = () => {
  const industriesDisplayNamesArray = getIndustriesNamesArray();
  return (
    <MainScreenView industriesDisplayNamesArray={industriesDisplayNamesArray} />
  );
};

export default Home;
