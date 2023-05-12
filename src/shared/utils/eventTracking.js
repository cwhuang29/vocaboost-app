import EVENT_TYPE from 'shared/constants/eventTracking';
import eventTrackingService from 'shared/services/eventTracking.service';
import { decodeAuthToken } from 'shared/utils/auth';
import { getDeviceInfo } from 'shared/utils/devices';
import { getLocalDate } from 'shared/utils/time';

const createEventTracking = async payload => {
  const deviceInfo = await getDeviceInfo();
  const p = { ...payload, deviceInfo, ts: getLocalDate() };
  // eventTrackingService.createEventTracking(p).catch(err => err);
};

export const createLoginEvent = ({ token }) => {
  const { uuid, loginMethod } = decodeAuthToken(token);
  createEventTracking({ type: EVENT_TYPE.LOGIN, userId: uuid, loginMethod });
};

export const createLeaveStudyScreenEvent = ({ userId, wordCount, timeElapsed }) => {
  createEventTracking({ type: EVENT_TYPE.LEAVE_STUDY_SCREEN, userId, wordCount, timeElapsed });
};
