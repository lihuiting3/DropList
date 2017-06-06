// Auto Generated.  DO NOT EDIT!
/**
  * @class yit.api.coupon.shouldPopup
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'yit.api.fcategoryentity.getFCategoryEntityForHomePageById',
[
  'zepto',
  'can',
  'lodash',
  'yit.framework.comm',
  'yit.api.security.type'
],
function($, can, _, Comm, SecurityType) {
  'use strict';

  return Comm.extend({
    api: {
      COMMON:{
        _mt: 'fcategoryentity.getFCategoryEntityForHomePageById',
        _ts: Date.now(),
        _aid: 1,
        security_type: SecurityType.None.name,
      },
      HTTP_METHOD: 'post',
      /**
      * METHOD_NAME: 'seriesSpu.getValidChildSpu',
      * SECURITY_TYPE: SecurityType.None.name,
      **/
      REQUIRED: {
        'fcategoryId':'int',
        'page':'string'
      },
      OPTIONAL: {
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    }
  });
});