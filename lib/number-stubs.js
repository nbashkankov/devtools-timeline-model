/**
 * @param {number} ms
 * @param {number=} precision
 * @return {string}
 */
Number.preciseMillisToString = function(ms, precision) {
  precision = precision || 0;
  var format = '%.' + precision + 'f\u2009ms';
  return Common.UIString(format, ms);
};

/** @type {!Common.UIStringFormat} */
UI._microsFormat = new Common.UIStringFormat('%.0f\u2009\u03bcs');

/** @type {!Common.UIStringFormat} */
UI._subMillisFormat = new Common.UIStringFormat('%.2f\u2009ms');

/** @type {!Common.UIStringFormat} */
UI._millisFormat = new Common.UIStringFormat('%.0f\u2009ms');

/** @type {!Common.UIStringFormat} */
UI._secondsFormat = new Common.UIStringFormat('%.2f\u2009s');

/** @type {!Common.UIStringFormat} */
UI._minutesFormat = new Common.UIStringFormat('%.1f\u2009min');

/** @type {!Common.UIStringFormat} */
UI._hoursFormat = new Common.UIStringFormat('%.1f\u2009hrs');

/** @type {!Common.UIStringFormat} */
UI._daysFormat = new Common.UIStringFormat('%.1f\u2009days');

/**
 * @param {number} ms
 * @param {boolean=} higherResolution
 * @return {string}
 */
Number.millisToString = function(ms, higherResolution) {
  if (!isFinite(ms))
    return '-';

  if (ms === 0)
    return '0';

  if (higherResolution && ms < 0.1)
    return UI._microsFormat.format(ms * 1000);
  if (higherResolution && ms < 1000)
    return UI._subMillisFormat.format(ms);
  if (ms < 1000)
    return UI._millisFormat.format(ms);

  var seconds = ms / 1000;
  if (seconds < 60)
    return UI._secondsFormat.format(seconds);

  var minutes = seconds / 60;
  if (minutes < 60)
    return UI._minutesFormat.format(minutes);

  var hours = minutes / 60;
  if (hours < 24)
    return UI._hoursFormat.format(hours);

  var days = hours / 24;
  return UI._daysFormat.format(days);
};

/**
 * @param {number} seconds
 * @param {boolean=} higherResolution
 * @return {string}
 */
Number.secondsToString = function(seconds, higherResolution) {
  if (!isFinite(seconds))
    return '-';
  return Number.millisToString(seconds * 1000, higherResolution);
};

/**
 * @param {number} bytes
 * @return {string}
 */
Number.bytesToString = function(bytes) {
  if (bytes < 1024)
    return Common.UIString('%.0f\u2009B', bytes);

  var kilobytes = bytes / 1024;
  if (kilobytes < 100)
    return Common.UIString('%.1f\u2009KB', kilobytes);
  if (kilobytes < 1024)
    return Common.UIString('%.0f\u2009KB', kilobytes);

  var megabytes = kilobytes / 1024;
  if (megabytes < 100)
    return Common.UIString('%.1f\u2009MB', megabytes);
  else
    return Common.UIString('%.0f\u2009MB', megabytes);
};
