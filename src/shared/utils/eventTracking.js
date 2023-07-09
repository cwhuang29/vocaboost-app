import EVENT_TYPE from 'shared/constants/eventTracking';
import eventTrackingService from 'shared/services/eventTracking.service';
import { decodeAuthToken } from 'shared/utils/auth';
import { getDeviceInfo } from 'shared/utils/devices';
import logger from 'shared/utils/logger';
import { getUser } from 'shared/utils/storage';
import { getLocalDate } from 'shared/utils/time';

const createEvent = async payload => {
  const [user, deviceInfo] = await Promise.all([getUser(), getDeviceInfo()]);
  const { uuid: userId, loginMethod } = user || {};
  const p = {
    ...payload,
    ...(!payload.userId && { userId }),
    ...(!payload.loginMethod && { loginMethod }),
    deviceInfo,
    ts: getLocalDate(),
  };
  logger(`(Event tracking). Event type: ${p.type}, metrics: ${JSON.stringify(p)}`);
  eventTrackingService.createEventTracking(p).catch(err => err); // Event tracking errors should not affect users
};

export const createLoginEvent = ({ token }) => {
  const { uuid, loginMethod } = decodeAuthToken(token);
  createEvent({ type: EVENT_TYPE.LOGIN, userId: uuid, loginMethod });
};

export const createLogoutEvent = () => {
  createEvent({ type: EVENT_TYPE.LOGOUT });
};

export const createEnterStudyScreenEvent = () => {
  createEvent({ type: EVENT_TYPE.ENTER_STUDY_SCREEN });
};

export const createLeaveStudyScreenEvent = ({ studyType, wordCount, timeElapsed }) => {
  createEvent({ type: EVENT_TYPE.LEAVE_STUDY_SCREEN, data: { studyType, wordCount, timeElapsed } });
};

export const createEnterAppEvent = () => {
  createEvent({ type: EVENT_TYPE.ENTER_APP });
};
