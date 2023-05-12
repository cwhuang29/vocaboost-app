import EVENT_TYPE from 'shared/constants/eventTracking';
import eventTrackingService from 'shared/services/eventTracking.service';
import { decodeAuthToken } from 'shared/utils/auth';
import { getLocalDate } from 'shared/utils/time';

const createEventTracking = payload => {
  eventTrackingService.createEventTracking({ ...payload, ts: getLocalDate() });
};

export const createLoginEvent = ({ token }) => {
  const { uuid, loginMethod } = decodeAuthToken(token);
  createEventTracking({ type: EVENT_TYPE.LOGIN, uuid, loginMethod });
};

export const createLeaveStudyScreenEvent = ({ deviceId, userId, wordCount, timeElapsed }) => {
  createEventTracking({ type: EVENT_TYPE.LEAVE_STUDY_SCREEN, deviceId, userId, wordCount, timeElapsed });
};
