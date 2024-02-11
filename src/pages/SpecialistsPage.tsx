import SpecialistsList from "../components/SpecialistsList/SpecialistsList";
import { useAppSelector } from "../store/store";
import { useCallback, useEffect, useState } from "react";
import { PER_PAGE, Specialist } from "../types";

const SpecialistsPage: React.FC = () => {
  const searchKey = useAppSelector((state) => state.specialists.searchKey);
  const list = useAppSelector((state) => state.specialists.specialistsList);
  const [offset, setOffset] = useState<number>(20);
  const [shownList, setShownList] = useState<Specialist[]>(
    list.slice(0, offset)
  );

  useEffect(() => {
    setShownList(list.slice(0, offset));
  }, [list]);

  const loadMore = useCallback(() => {
    if (!searchKey) {
      setTimeout(() => {
        setOffset((prev) => prev + PER_PAGE);
        setShownList((prev) => list.slice(0, prev.length + PER_PAGE));
      }, 1000);
    }
  }, [list]);

  return (
    <div>
      <SpecialistsList
        list={shownList}
        nextPage={loadMore}
        hasMore={list.length > shownList.length}
      />
    </div>
  );
};

export default SpecialistsPage;
