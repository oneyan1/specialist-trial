import Union from "../../../assets/icons/Union.svg";
import Heart from "../../../assets/icons/Icon_heart.svg";
import Avatar from "../../../assets/Avatar.png";
import AvatarMan from "../../../assets/Avatar-man.png";

import NotificationIcon from "../../../assets/icons/notification_outline.svg";
import CalendarIcon from "../../../assets/icons/calendar_calendar.svg";
import MailIcon from "../../../assets/icons/mail.svg";
import StarIcon from "../../../assets/icons/Star.svg";

import "./index.scss";
import { Specialist } from "../../types";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../store/store";
import {
  setFavorites,
  updateSpecialist,
} from "../../store/reducers/SpecialistsSlice";

type SpecialistCardProps = {
  specialist: Specialist;
};

const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist }) => {
  const dispatch = useAppDispatch();

  const bgColor = useMemo(() => {
    let hash = 0;
    let i;
    for (i = 0; i < specialist.fullName.length; i += 1) {
      hash = specialist.fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return { color, transColor: color + "30" };
  }, [specialist]);

  const getAvatarInitials = useMemo(() => {
    return `${specialist.fullName.split(" ")[0][0]}${
      specialist.fullName.split(" ")[1][0]
    }`;
  }, [specialist.fullName]);

  const setFavoriteStatus = useCallback(() => {
    dispatch(setFavorites(specialist));
  }, [specialist]);

  const setGrade = useCallback((grade: number) => {
    if (!specialist.userGrade) {
      dispatch(
        updateSpecialist({
          id: specialist.id,
          newValue: {
            ...specialist,
            userGrade: grade,
            numberOfGrade: specialist.numberOfGrade + 1,
            averageGrade: Number(
              (
                (specialist.averageGrade * specialist.numberOfGrade + grade) /
                (specialist.numberOfGrade + 1)
              ).toFixed(1)
            ),
          },
        })
      );
    }
  }, []);

  return (
    <div className="specialist">
      <div className="specialist-topActions">
        <button className="button-icon specialist-topActions_more">
          <Union width={20} height={4} />
        </button>
        <button className="button-icon" onClick={setFavoriteStatus}>
          <Heart width={20} height={18} />
        </button>
      </div>
      <div className="specialist-info">
        {specialist.avatar ? (
          <img
            src={specialist.avatar === "Avatar" ? Avatar : AvatarMan}
            alt=""
            className="specialist-info__photo"
          />
        ) : (
          <div
            className="specialist-info__avatar"
            style={{
              backgroundColor: bgColor.transColor,
            }}
          >
            <span
              className="specialist-info__avatar_text"
              style={{ color: bgColor.color }}
            >
              {getAvatarInitials}
            </span>
          </div>
        )}

        <h2 className="specialist-info__name">{specialist.fullName}</h2>
        <h5 className="specialist-info__position">{specialist.position}</h5>
      </div>
      <div className="specialist-contact">
        <button className="specialist-contact__button">
          <NotificationIcon width={24} height={24} />
        </button>
        <button className="specialist-contact__button">
          <CalendarIcon width={24} height={24} />
        </button>
        <button className="specialist-contact__button">
          <MailIcon width={24} height={24} fill="#3540ff" />
        </button>
      </div>
      <div className="specialist-grade">
        <div className="specialist-grade__stars">
          {[...Array(5)].map((item, index) => (
            <StarIcon
              width={28}
              height={28}
              key={index}
              onClick={() => setGrade(index + 1)}
              className={
                specialist.userGrade && index + 1 <= specialist.userGrade
                  ? "specialist-grade__stars_active"
                  : ""
              }
            />
          ))}
        </div>
        <div className="specialist-appraisal">
          <h2 className="specialist-appraisal__grade">
            {specialist.averageGrade}
          </h2>
          <span className="specialist-appraisal__count">
            ({specialist.numberOfGrade})
          </span>
        </div>
      </div>
      <div className="specialist-bottomAction">
        <button className="specialist-bottomAction__button specialist-bottomAction__button_left">
          PROFIL
        </button>
        <button className="specialist-bottomAction__button specialist-bottomAction__button_right">
          BOOK A VISIT
        </button>
      </div>
    </div>
  );
};

export default SpecialistCard;
