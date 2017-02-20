// Auto Generated.  DO NOT EDIT!
/**
  * @class yit.api.seriesSpu.getValidChildSpu
  * @param  {Object} $
  * @param  {Object} can
  * @param  {Object} _
  * @param  {can.Construct} Comm
  * @param  {Object} SecurityType
  * @return {can.Construct}
  */
define(
'yit.api.seriesSpu.getValidChildSpu',
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
        _mt: 'seriesSpu.getValidChildSpu',
        _ts: Date.now(),
        _aid: 1
      },
      HTTP_METHOD: 'post',
      /**
      * METHOD_NAME: 'seriesSpu.getValidChildSpu',
      * SECURITY_TYPE: SecurityType.None.name,
      **/
      REQUIRED: {
        'parentSpuId': 'int'
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