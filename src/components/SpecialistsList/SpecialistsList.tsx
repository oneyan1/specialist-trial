import SpecialistCard from "../SpecialistCard/SpecialistCard";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../core/Loader";
import { Specialist } from "../../types";

type SpecialistsListProps = {
  list: Specialist[];
  nextPage: () => void;
  hasMore: boolean;
};

const SpecialistsList: React.FC<SpecialistsListProps> = ({
  list,
  nextPage,
  hasMore,
}) => {
  return (
    <>
      <InfiniteScroll
        loadMore={nextPage}
        hasMore={hasMore}
        loader={<Loader key={0} />}
      >
        <div className="row">
          {list.map((item) => (
            <div className="item" key={item.id}>
              <SpecialistCard specialist={item} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default SpecialistsList;
