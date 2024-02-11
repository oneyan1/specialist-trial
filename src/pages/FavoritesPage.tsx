import { useAppSelector } from "../store/store";
import SpecialistCard from "../components/SpecialistCard/SpecialistCard";

interface FavoritesPageProps {}

const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  const list = useAppSelector(
    (state) => state.specialists.favoriteSpecialistList
  );

  return (
    <div>
      <div className="row">
        {list.map((item) => (
          <div className="item" key={item.id}>
            <SpecialistCard specialist={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
