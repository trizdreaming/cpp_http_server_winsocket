function jkConsoleLog() {
    var msgs = [];
    for (var i1 = 0; i1 < arguments.length - 0; i1 += 1) {
        msgs[i1] = arguments[i1 + 0];
    };
    var msg = '';
    var _js3 = msgs.length;
    for (var _js2 = 0; _js2 < _js3; _js2 += 1) {
        var m = msgs[_js2];
        msg += m;
    };
    return console.log(msg);
};
function jkObjectProperties(obj) {
    var res = [];
    for (var p in obj) {
        res.push(p);
    };
    return res;
};
function jkRtrim(str) {
    return str.replace(/\s+$/g, '');
};
function jkGcDeviceColor(gc, color) {
    var r = color[0];
    var g = color[1];
    var b = color[2];
    var res = 0;
    var byteVal = function (x) {
        return Math.floor(x * 255);
    };
    res = 16777216 + byteVal(r) * 65536 + byteVal(g) * 256 + byteVal(b);
    res = '#' + res.toString(16).substring(1);
    return res;
};
function jkDocumentGetElementById(id) {
    return document.getElementById(id);
};
function jkDocumentGetDc(id) {
    var canvas = jkDocumentGetElementById(id);
    return canvas.getContext('2d');
};
function jkDcArc(dc, x, y, r, s, e, ccw) {
    if (ccw === undefined) {
        ccw = true;
    };
    return dc.arc(x, y, r, s, e, ccw);
};
function jkDcBeginPath(dc) {
    return dc.beginPath();
};
function jkDcClearRect(dc, x, y, width, height) {
    return dc.clearRect(x, y, width, height);
};
function jkDcClosePath(dc) {
    return dc.closePath();
};
function jkDcFill(dc) {
    return dc.fill();
};
function jkDcLineTo(dc, x, y) {
    return dc.lineTo(x, y);
};
function jkDcLineWidth(dc) {
    return dc.lineWidth;
};
function __setf_jkDcLineWidth(newval, dc) {
    return dc.lineWidth = newval;
};
function jkDcMoveTo(dc, x, y) {
    return dc.moveTo(x, y);
};
function jkDcQuadraticCurveTo(dc, x1, y1, x2, y2) {
    return dc.quadraticCurveTo(x1, y1, x2, y2);
};
function jkDcStroke(dc) {
    return dc.stroke();
};
function jkDcStrokeStyle(dc) {
    return dc.strokeStyle;
};
function __setf_jkDcStrokeStyle(newval, dc) {
    return dc.strokeStyle = newval;
};
function jkDcStrokeText(dc, text, x, y) {
    return dc.strokeText(text, x, y);
};
function jkDcFillText(dc, text, x, y) {
    return dc.fillText(text, x, y);
};
function jkJsglAjax(gc, url) {
    return jkXmlHttpRequest(url, function (xhr) {
        return function () {
            var _js4 = jkJsonParse(xhr.responseText);
            var _js6 = _js4.length;
            for (var _js5 = 0; _js5 < _js6; _js5 += 1) {
                var _db7 = _js4[_js5];
                var cmd = _db7[0];
                var args = _db7.length > 1 ? _db7.slice(1) : [];
                if (cmd == 'model-begin') {
                } else if (cmd == 'model-end') {
                } else if (cmd == 'color') {
                    jkGcColor(gc, args[0], args[1], args[2], args[3]);
                } else if (cmd == 'push-matrix') {
                    jkGcPushMatrix(gc);
                } else if (cmd == 'pop-matrix') {
                    jkGcPopMatrix(gc);
                } else if (cmd == 'rotate-3d') {
                    jkGcRotate3d(gc, args[0], args[1], args[2], args[3]);
                } else if (cmd == 'translate-3d') {
                    jkGcTranslate3d(gc, args[0], args[1], args[2]);
                } else if (cmd == 'vertex') {
                    jkGcVertex(gc, args[0], args[1], args[2]);
                } else if (cmd == 'text') {
                    jkGcText(gc, args[0]);
                } else if (cmd == 'begin') {
                    jkGcBegin(gc, args[0]);
                } else if (cmd == 'end') {
                    jkGcEnd(gc);
                } else {
                    var MSG1703 = '';
                    var MSGLST1704 = ['cmd = ', cmd, 'args = ', args];
                    var _js9 = MSGLST1704.length;
                    for (var _js8 = 0; _js8 < _js9; _js8 += 1) {
                        var m = MSGLST1704[_js8];
                        MSG1703 += m;
                    };
                    console.debug(MSG1703);
                };
            };
        };
    });
};
function jkMakeMatrix(rows, cols) {
    var mat = new Array([rows, cols]);
    for (var r = 0; r < rows; r += 1) {
        mat[r] = new Array(cols);
        for (var c = 0; c < cols; c += 1) {
            mat[r][c] = 0;
        };
    };
    return mat;
};
function jkMatrixRows(m) {
    return m.length;
};
function jkMatrixCols(m) {
    return m[0].length;
};
function jkMatrixPrint(mat) {
    var _js8 = mat.length;
    for (var _js7 = 0; _js7 < _js8; _js7 += 1) {
        var row = mat[_js7];
        var MSG1705 = '';
        var MSGLST1706 = [row];
        var _js10 = MSGLST1706.length;
        for (var _js9 = 0; _js9 < _js10; _js9 += 1) {
            var m = MSGLST1706[_js9];
            MSG1705 += m;
        };
        console.debug(MSG1705);
    };
};
function jkStackOfMatrixPrint(stk) {
    var _js10 = stk.length;
    for (var _js9 = 0; _js9 < _js10; _js9 += 1) {
        var mat = stk[_js9];
        jkMatrixPrint(mat);
        var MSG1707 = '';
        var MSGLST1708 = ['----'];
        var _js12 = MSGLST1708.length;
        for (var _js11 = 0; _js11 < _js12; _js11 += 1) {
            var m = MSGLST1708[_js11];
            MSG1707 += m;
        };
        console.debug(MSG1707);
    };
};
function jkMakeStack() {
    return [];
};
function jkStackClear(stk) {
    return stk.length = 0;
};
function jkStackEmptyP(stk) {
    return stk.length === 0;
};
function jkStackTop(stk) {
    return stk[stk.length - 1];
};
function __setf_jkStackTop(newVal, stk) {
    return stk[stk.length - 1] = newVal;
};
function jkStackPush(val, stk) {
    stk.push(val);
    return val;
};
function jkStackPop(stk) {
    return stk.pop();
};
function jkMakeBuffer() {
    var ary = new Array(1);
    ary[0] = new Array(0);
    return ary;
};
function jkBufferAdd(val, buf) {
    return buf[0].push(val);
};
function jkBufferClear(buf) {
    return buf[0] = new Array(0);
};
function jkBufferVector(buf) {
    return buf[0];
};
function jkGcError() {
    var msgs = [];
    for (var i11 = 0; i11 < arguments.length - 0; i11 += 1) {
        msgs[i11] = arguments[i11 + 0];
    };
    return jkConsoleLog.apply(this, msgs);
};
function jkGcFlushVertices(gc) {
    jkGcPrepareDeviceMatrix(gc);
    var elemBuf = jkBufferVector(gc[JKGCVERTEXBUFFER]);
    var dc = gc[JKGCDEVICECONTEXT];
    var buflen = elemBuf.length;
    var visibleBuffer = function (vertexBuffer) {
        var visibleP = null;
        jkVertexBufferIter(function (index, color, coord) {
            var eye = jkGcEyeCoord(gc, coord);
            var ndc = jkGcNormDevCoord(gc, eye);
            return eye[2][0] >= 0.001 && Math.abs(ndc[0][0]) <= 1 && Math.abs(ndc[1][0]) <= 1 && Math.abs(ndc[2][0]) <= 1 ? (visibleP = true) : null;
        }, vertexBuffer);
        if (visibleP) {
            var buf = jkMakeBuffer();
            jkVertexBufferIter(function (index, color, coord) {
                var eye = jkGcEyeCoord(gc, coord);
                var ndc = jkGcNormDevCoord(gc, eye);
                var ndc1 = jkMatrixCopy(ndc);
                ndc1[2][0] = 1;
                var pt = jkGcDeviceCoord(gc, ndc1);
                return jkBufferAdd(jkMakeVertex(color, pt), buf);
            }, vertexBuffer);
            return buf;
        } else {
            return jkMakeBuffer();
        };
    };
    var flushLineLoop = function () {
        var buf = visibleBuffer(e[JKVGVERTICES]);
        jkDcBeginPath(dc);
        jkVertexBufferIter(function (index, color, cvec) {
            if (index === 0) {
                __setf_jkDcStrokeStyle(jkGcDeviceColor(gc, color), dc);
                return jkDcMoveTo(dc, cvec[0][0], cvec[1][0]);
            } else {
                return jkDcLineTo(dc, cvec[0][0], cvec[1][0]);
            };
        }, buf);
        jkDcClosePath(dc);
        return jkDcStroke(dc);
    };
    for (var i = 0; i < buflen; i += 1) {
        var e = elemBuf[i];
        if (e[JKVGGRCMD] == JKGRCMDLINELOOP) {
            flushLineLoop();
        } else {
            jkGcError('gc-flush error', e[0]);
        };
    };
};
function jkGcFlushText(gc) {
    var txvBuffer = jkBufferVector(gc[JKGCTEXTBUFFER]);
    var dc = gc[JKGCDEVICECONTEXT];
    var _js13 = txvBuffer.length;
    for (var _js12 = 0; _js12 < _js13; _js12 += 1) {
        var txv = txvBuffer[_js12];
        var color = txv[JKTXVCOLOR];
        var text = txv[JKTXVTEXT];
        var coord = txv[JKTXVCOORD];
        var eye = jkGcEyeCoord(gc, coord);
        var ndc = jkGcNormDevCoord(gc, eye);
        var ndc1 = jkMatrixCopy(ndc);
        ndc1[2][0] = 1;
        var pt = jkGcDeviceCoord(gc, ndc1);
        __setf_jkDcStrokeStyle(jkGcDeviceColor(gc, color), dc);
        if (eye[2][0] > 0.001 && Math.abs(ndc[0][0]) <= 1 && Math.abs(ndc[1][0]) <= 1 && Math.abs(ndc[2][0]) <= 1) {
            jkDcFillText(dc, text, pt[0][0], pt[1][0]);
        };
    };
};
function jkGcFlush(gc) {
    jkGcFlushVertices(gc);
    return jkGcFlushText(gc);
};
function jkGcPrint(gc) {
    var matrixMode = gc[JKGCMATRIXMODE];
    var modelviewStack = gc[JKGCMODELVIEWSTACK];
    var projectionStack = gc[JKGCPROJECTIONSTACK];
    var textureStack = gc[JKGCTEXTURESTACK];
    var colorStack = gc[JKGCCOLORSTACK];
    var vertexMode = gc[JKGCVERTEXMODE];
    var currentElement = gc[JKGCCURRENTELEMENT];
    var vertexBuffer = gc[JKGCVERTEXBUFFER];
    var MSG1709 = '';
    var MSGLST1710 = ['matrix-mode', matrixMode];
    var _js15 = MSGLST1710.length;
    for (var _js14 = 0; _js14 < _js15; _js14 += 1) {
        var m = MSGLST1710[_js14];
        MSG1709 += m;
    };
    console.debug(MSG1709);
    var MSG1711 = '';
    var MSGLST1712 = ['modelview-stack'];
    var _js17 = MSGLST1712.length;
    for (var _js16 = 0; _js16 < _js17; _js16 += 1) {
        var m18 = MSGLST1712[_js16];
        MSG1711 += m18;
    };
    console.debug(MSG1711);
    jkStackOfMatrixPrint(modelviewStack);
    var MSG1713 = '';
    var MSGLST1714 = ['projection-stack'];
    var _js19 = MSGLST1714.length;
    for (var _js18 = 0; _js18 < _js19; _js18 += 1) {
        var m20 = MSGLST1714[_js18];
        MSG1713 += m20;
    };
    console.debug(MSG1713);
    jkStackOfMatrixPrint(projectionStack);
    var MSG1715 = '';
    var MSGLST1716 = ['texture-stack', textureStack];
    var _js21 = MSGLST1716.length;
    for (var _js20 = 0; _js20 < _js21; _js20 += 1) {
        var m22 = MSGLST1716[_js20];
        MSG1715 += m22;
    };
    console.debug(MSG1715);
    var MSG1717 = '';
    var MSGLST1718 = ['color-stack', colorStack];
    var _js23 = MSGLST1718.length;
    for (var _js22 = 0; _js22 < _js23; _js22 += 1) {
        var m24 = MSGLST1718[_js22];
        MSG1717 += m24;
    };
    console.debug(MSG1717);
    var MSG1719 = '';
    var MSGLST1720 = ['vertex-mode', vertexMode];
    var _js25 = MSGLST1720.length;
    for (var _js24 = 0; _js24 < _js25; _js24 += 1) {
        var m26 = MSGLST1720[_js24];
        MSG1719 += m26;
    };
    console.debug(MSG1719);
    var MSG1721 = '';
    var MSGLST1722 = ['current-element', currentElement];
    var _js27 = MSGLST1722.length;
    for (var _js26 = 0; _js26 < _js27; _js26 += 1) {
        var m28 = MSGLST1722[_js26];
        MSG1721 += m28;
    };
    console.debug(MSG1721);
    var MSG1723 = '';
    var MSGLST1724 = ['vertex-buffer', vertexBuffer];
    var _js29 = MSGLST1724.length;
    for (var _js28 = 0; _js28 < _js29; _js28 += 1) {
        var m30 = MSGLST1724[_js28];
        MSG1723 += m30;
    };
    return console.debug(MSG1723);
};
function jkDomMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return { x : evt.clientX - rect.left, y : evt.clientY - rect.top };
};
function jkDomHtmlEvent(name) {
    return name == 'load' || name == 'unload' || name == 'abort' || name == 'error' || name == 'resize' || name == 'scroll' ? name : null;
};
function jkDomFormEvent(name) {
    return name == 'select' || name == 'change' || name == 'submit' || name == 'reset' || name == 'focus' || name == 'blur' ? name : null;
};
function jkDomUiEvent(name) {
    return name == 'focusin' || name == 'focusout' || name == 'DOMActivate' ? name : null;
};
function jkDomMutationEvent(name) {
    return name == 'DOMSubtreeModified' || name == 'DOMNodeInserted' || name == 'DOMNodeRemoved' || name == 'DOMNodeRemovedFromDocument' || name == 'DomNodeInsertedIntoDocument' || name == 'DOMAttrModified' || name == 'DOMCharacterDataModified' ? name : null;
};
function jkXmlHttpRequest(uri, fn) {
    var xhr = new XMLHttpRequest();
    var callback = fn(xhr);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback();
                alert('ajax call terminated');
            } else {
                alert('error: ' + xhr.status);
            };
        };
        return null;
    };
    xhr.open('GET', uri);
    xhr.send(null);
    return xhr.responseXML;
};
function jkJsonParse(text) {
    var obj = JSON.parse(text);
    return obj;
};
function jkMakeVector() {
    var args = [];
    for (var i30 = 0; i30 < arguments.length - 0; i30 += 1) {
        args[i30] = arguments[i30 + 0];
    };
    var len = args.length;
    var ary = new Array(len);
    var _js32 = args.length;
    var FIRST33 = true;
    for (var i = 0; i < len; i += 1) {
        var _js31 = FIRST33 ? 0 : _js31 + 1;
        if (_js31 >= _js32) {
            break;
        };
        var v = args[_js31];
        ary[i] = v;
        FIRST33 = null;
    };
    return ary;
};
function jkVectorAdd(x, y) {
    var len = x.length;
    var res = new Array(len);
    for (var i = 0; i < len; i += 1) {
        res[i] = x[i] + y[i];
    };
    return res;
};
function jkVectorSub(x, y) {
    var len = x.length;
    var res = new Array(len);
    for (var i = 0; i < len; i += 1) {
        res[i] = x[i] - y[i];
    };
    return res;
};
function jkVectorSmul(s, x) {
    var len = x.length;
    var res = new Array(len);
    for (var i = 0; i < len; i += 1) {
        res[i] = s * x[i];
    };
    return res;
};
function jkVectorMap(x) {
    return x;
};
function __setf_jkVectorMap(newVal, x) {
    var len = x.length;
    for (var i = 0; i < len; i += 1) {
        x[i] = newVal[i];
    };
    return x;
};
function jkMatrixAdd(a, b) {
    var nr = jkMatrixRows(a);
    var nc = jkMatrixCols(b);
    var res = jkMakeMatrix(nr, nc);
    for (var i = 0; i < nr; i += 1) {
        for (var j = 0; j < nc; j += 1) {
            res[i][j] = a[i][j] + b[i][j];
        };
    };
    return res;
};
function jkMatrixSub(a, b) {
    var nr = jkMatrixRows(a);
    var nc = jkMatrixCols(b);
    var res = jkMakeMatrix(nr, nc);
    for (var i = 0; i < nr; i += 1) {
        for (var j = 0; j < nc; j += 1) {
            res[i][j] = a[i][j] - b[i][j];
        };
    };
    return res;
};
function jkMatrixMul(m1, m2) {
    var res = jkMakeMatrix(jkMatrixRows(m1), jkMatrixCols(m2));
    var nrow = jkMatrixRows(m1);
    var nrc = jkMatrixCols(m1);
    var ncol = jkMatrixCols(m2);
    for (var r = 0; r < nrow; r += 1) {
        for (var c = 0; c < ncol; c += 1) {
            res[r][c] = 0;
            for (var k = 0; k < nrc; k += 1) {
                res[r][c] += m1[r][k] * m2[k][c];
            };
        };
    };
    return res;
};
function jkMatrixMap(m) {
    return m;
};
function __setf_jkMatrixMap(newVal, m) {
    var nrow = jkMatrixRows(m);
    var ncol = jkMatrixCols(m);
    for (var r = 0; r < nrow; r += 1) {
        for (var c = 0; c < ncol; c += 1) {
            m[r][c] = newVal[r][c];
        };
    };
    return m;
};
function jkMatrixCopy(m) {
    var nrow = jkMatrixRows(m);
    var ncol = jkMatrixCols(m);
    var res = jkMakeMatrix(nrow, ncol);
    for (var i = 0; i < nrow; i += 1) {
        for (var j = 0; j < ncol; j += 1) {
            res[i][j] = m[i][j];
        };
    };
    return res;
};
function jkMatrixIdentity(dim) {
    var res = jkMakeMatrix(dim, dim);
    for (var k = 0; k < dim; k += 1) {
        res[k][k] = 1;
    };
    return res;
};
function jkMatrixScale2d(scale) {
    var res = jkMakeMatrix(3, 3);
    res[0][0] = scale;
    res[1][1] = scale;
    res[2][2] = 1;
    return res;
};
function jkMatrixTranslate2d(x, y) {
    var res = jkMakeMatrix(3, 3);
    res[0][0] = 1;
    res[1][1] = 1;
    res[0][2] = x;
    res[1][2] = y;
    res[2][2] = 1;
    return res;
};
function jkMatrixRotate2d(theta) {
    var mat = jkMakeMatrix(3, 3);
    mat[0][0] = Math.cos(theta);
    mat[0][1] = -Math.sin(theta);
    mat[1][0] = Math.sin(theta);
    mat[1][1] = Math.cos(theta);
    mat[2][2] = 1;
    return mat;
};
function jkMakeCvector() {
    var args = [];
    for (var i34 = 0; i34 < arguments.length - 0; i34 += 1) {
        args[i34] = arguments[i34 + 0];
    };
    var vec = jkMakeMatrix(args.length, 1);
    var _js36 = args.length;
    var FIRST37 = true;
    for (var i = 0; true; i += 1) {
        var _js35 = FIRST37 ? 0 : _js35 + 1;
        if (_js35 >= _js36) {
            break;
        };
        var x = args[_js35];
        vec[i][0] = x;
        FIRST37 = null;
    };
    return vec;
};
function jkCvector3d(x, y, z) {
    return jkMakeCvector(x, y, z, 1);
};
function jkCvectorNormal3d(cvec) {
    var x = cvec[0][0];
    var y = cvec[1][0];
    var z = cvec[2][0];
    var n = Math.sqrt(x * x + y * y + z * z);
    return jkMakeCvector(x / n, y / n, z / n, 1);
};
function jkCvectorSpherical(cvec) {
    var x = cvec[0][0];
    var y = cvec[1][0];
    var z = cvec[2][0];
    var rho = Math.sqrt(x * x + y * y + z * z);
    var theta = Math.atan(y / x);
    var phi = Math.atan(Math.sqrt(x * x + y * y) / z);
    print([rho, 180 * (theta / Math.PI), 180 * (phi / Math.PI)]);
    return jkMakeCvector(rho, theta, phi, 1);
};
function jkCvectorInner3d(x, y) {
    var sum = 0;
    for (var i = 0; i < 3; i += 1) {
        sum += x[i][0] * y[i][0];
    };
    return sum;
};
function jkCvectorCross3d(a, b) {
    var ax = a[0][0];
    var ay = a[1][0];
    var az = a[2][0];
    var bx = b[0][0];
    var by = b[1][0];
    var bz = b[2][0];
    return jkMakeCvector(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx, 1);
};
function jkCvector2dPack(x) {
    var ary = new Array(2);
    ary[0] = x[0][0];
    ary[1] = x[1][0];
    return ary;
};
function jkCvector3dPack(x) {
    var ary = new Array(3);
    ary[0] = x[0][0];
    ary[1] = x[1][0];
    ary[2] = x[2][0];
    return ary;
};
function jkMatrixTranslate3d(dx, dy, dz) {
    var mat = jkMatrixIdentity(4);
    mat[0][3] = dx;
    mat[1][3] = dy;
    mat[2][3] = dz;
    mat[3][3] = 1;
    return mat;
};
function jkMatrixRotate3d(angle, x, y, z) {
    var u = Math.sqrt(x * x + y * y + z * z);
    var theta = Math.PI * (angle / 180);
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var k = 1 - c;
    var ux = x / u;
    var uy = y / u;
    var uz = z / u;
    var m11 = c + ux * ux * k;
    var m12 = ux * uy * k - uz * s;
    var m13 = ux * uz * k + uy * s;
    var m21 = uy * ux * k + uz * s;
    var m22 = c + uy * uy * k;
    var m23 = uy * uz * k - ux * s;
    var m31 = uz * ux * k - uy * s;
    var m32 = uz * uy * k + ux * s;
    var m33 = c + uz * uz * k;
    var mat = jkMakeMatrix(4, 4);
    mat[0][0] = m11;
    mat[0][1] = m12;
    mat[0][2] = m13;
    mat[1][0] = m21;
    mat[1][1] = m22;
    mat[1][2] = m23;
    mat[2][0] = m31;
    mat[2][1] = m32;
    mat[2][2] = m33;
    mat[3][3] = 1;
    return mat;
};
function jkMatrixLookAt3d(eye, center, up) {
    var zaxis = jkCvectorNormal3d(jkMatrixSub(center, eye));
    var xaxis = jkCvectorNormal3d(jkCvectorCross3d(zaxis, up));
    var yaxis = jkCvectorCross3d(xaxis, zaxis);
    var mat = jkMakeMatrix(4, 4);
    mat[0][0] = xaxis[0][0];
    mat[0][1] = xaxis[1][0];
    mat[0][2] = xaxis[2][0];
    mat[0][3] = -jkCvectorInner3d(xaxis, eye);
    mat[1][0] = yaxis[0][0];
    mat[1][1] = yaxis[1][0];
    mat[1][2] = yaxis[2][0];
    mat[1][3] = -jkCvectorInner3d(yaxis, eye);
    mat[2][0] = zaxis[0][0];
    mat[2][1] = zaxis[1][0];
    mat[2][2] = zaxis[2][0];
    mat[2][3] = -jkCvectorInner3d(zaxis, eye);
    mat[3][3] = 1;
    return mat;
};
function jkMatrixPerspective(fov, aspect, near, far) {
    var rad = Math.PI * (fov / 180);
    var uh = 1 / Math.tan(rad);
    var uw = uh / aspect;
    var depth = far - near;
    var mat = jkMakeMatrix(4, 4);
    mat[0][0] = uw;
    mat[1][1] = uh;
    mat[2][2] = ((far + near)) / depth;
    mat[2][3] = -(2 * far * near) / depth;
    mat[3][2] = 1;
    return mat;
};
var JKGRCMDLINELOOP = 0;
var JKGRCMDTEXT2D = 1;
var JKGRCMDLINESTRIP = 2;
var JKGRCMDTRIANGLESTRIP = 3;
var JKVERTEXCOLOR = 0;
var JKVERTEXCOORD = 1;
var JKVERTEXMAXSIZE = 2;
function jkMakeColor(r, g, b, a) {
    return jkMakeVector(r, g, b, a);
};
function jkMakeCoord(x, y, z) {
    return jkMakeVector(x, y, z);
};
function jkMakeVertex(color, coord) {
    var vertex = new Array(JKVERTEXMAXSIZE);
    vertex[JKVERTEXCOLOR] = color;
    vertex[JKVERTEXCOORD] = coord;
    return vertex;
};
var JKVGGRCMD = 0;
var JKVGVERTICES = 1;
var JKVGMAXSIZE = 2;
function jkMakeVertexGroup(grcmd) {
    var vg = new Array(JKVGMAXSIZE);
    vg[JKVGGRCMD] = grcmd;
    vg[JKVGVERTICES] = jkMakeBuffer();
    return vg;
};
function jkVgAdd(vertex, vertexGroup) {
    var buf = vertexGroup[JKVGVERTICES];
    return jkBufferAdd(vertex, buf);
};
function jkVertexBufferIter(callback, vertexBuffer) {
    var vertices = jkBufferVector(vertexBuffer);
    var arylen = vertices.length;
    for (var i = 0; i < arylen; i += 1) {
        var v = vertices[i];
        var color = v[JKVERTEXCOLOR];
        var coord = v[JKVERTEXCOORD];
        callback(i, color, coord);
    };
};
var JKTXVCOORD = 0;
var JKTXVCOLOR = 1;
var JKTXVTEXT = 2;
var JKTXVMAXSIZE = 3;
function jkMakeTextVertex() {
    var textVertex = new Array(JKTXVMAXSIZE);
    textVertex[JKTXVTEXT] = '(blank)';
    return textVertex;
};
var JKVIEWPORTLEFT = 0;
var JKVIEWPORTBOTTOM = 1;
var JKVIEWPORTWIDTH = 2;
var JKVIEWPORTHEIGHT = 3;
var JKVIEWPORTMAXSIZE = 4;
function jkMakeViewport(x, y, width, height) {
    var viewport = new Array(JKVIEWPORTMAXSIZE);
    viewport[JKVIEWPORTLEFT] = x;
    viewport[JKVIEWPORTBOTTOM] = y;
    viewport[JKVIEWPORTWIDTH] = width;
    viewport[JKVIEWPORTHEIGHT] = height;
    return viewport;
};
var JKGCMODELVIEW = 0;
var JKGCPROJECTION = 1;
var JKGCMATRIXDEVICE = 0;
var JKGCCARTESIANDEVICE = 1;
var JKGCMATRIXMODE = 0;
var JKGCMODELVIEWSTACK = 1;
var JKGCPROJECTIONSTACK = 2;
var JKGCTEXTURESTACK = 3;
var JKGCCOLORSTACK = 4;
var JKGCCURRENTCOMMAND = 5;
var JKGCCURRENTELEMENT = 6;
var JKGCVIEWPORT = 7;
var JKGCVERTEXBUFFER = 8;
var JKGCTEXTBUFFER = 9;
var JKGCDEVICEMODE = 10;
var JKGCDEVICECONTEXT = 11;
var JKGCDEVICEMATRIX = 12;
var JKGCMAXSIZE = 13;
function jkMakeGraphicsContext() {
    var gc = new Array(JKGCMAXSIZE);
    var matrixMode = JKGCMODELVIEW;
    var modelviewStack = jkMakeStack();
    var projectionStack = jkMakeStack();
    var textureStack = jkMakeStack();
    var colorStack = jkMakeStack();
    var currentCommand = null;
    var currentElement = null;
    var vertexBuffer = jkMakeBuffer();
    var viewport = jkMakeViewport(0, 0, 1024, 768);
    var textBuffer = jkMakeBuffer();
    gc[JKGCMATRIXMODE] = matrixMode;
    gc[JKGCMODELVIEWSTACK] = modelviewStack;
    gc[JKGCPROJECTIONSTACK] = projectionStack;
    gc[JKGCTEXTURESTACK] = textureStack;
    gc[JKGCCOLORSTACK] = colorStack;
    gc[JKGCCURRENTCOMMAND] = currentCommand;
    gc[JKGCCURRENTELEMENT] = currentElement;
    gc[JKGCVERTEXBUFFER] = vertexBuffer;
    gc[JKGCVIEWPORT] = viewport;
    gc[JKGCTEXTBUFFER] = textBuffer;
    gc[JKGCDEVICEMODE] = JKGCMATRIXDEVICE;
    jkStackPush(jkMatrixIdentity(4), modelviewStack);
    jkStackPush(jkMatrixIdentity(4), projectionStack);
    jkStackPush(jkMakeColor(0, 0, 0, 1), colorStack);
    return gc;
};
function jkGcClear(gc, flag) {
    var matrixMode = JKGCMODELVIEW;
    var modelviewStack = gc[JKGCMODELVIEWSTACK];
    var projectionStack = gc[JKGCPROJECTIONSTACK];
    var textureStack = gc[JKGCTEXTURESTACK];
    var colorStack = gc[JKGCCOLORSTACK];
    var currentElement = null;
    var vertexBuffer = gc[JKGCVERTEXBUFFER];
    var textBuffer = gc[JKGCTEXTBUFFER];
    var dc = gc[JKGCDEVICECONTEXT];
    gc[JKGCMATRIXMODE] = matrixMode;
    jkStackClear(modelviewStack);
    jkStackClear(projectionStack);
    jkStackClear(textureStack);
    jkStackClear(colorStack);
    gc[JKGCCURRENTELEMENT] = currentElement;
    jkBufferClear(vertexBuffer);
    jkBufferClear(textBuffer);
    jkDcClearRect(dc, 0, 0, 1024, 768);
    jkStackPush(jkMatrixIdentity(4), modelviewStack);
    jkStackPush(jkMatrixIdentity(4), projectionStack);
    jkStackPush(jkMakeColor(0, 0, 0, 1), colorStack);
    return gc;
};
function jkGcMatrixMode(gc, mode) {
    return gc[JKGCMATRIXMODE] = mode;
};
function jkGcCurrentStack(gc) {
    var matrixMode = gc[JKGCMATRIXMODE];
    if (matrixMode == JKGCMODELVIEW) {
        return gc[JKGCMODELVIEWSTACK];
    } else if (matrixMode == JKGCPROJECTION) {
        return gc[JKGCPROJECTIONSTACK];
    } else {
        return jkGcError('no matrix mode');
    };
};
function jkGcCurrentColor(gc) {
    var colorStack = gc[JKGCCOLORSTACK];
    return jkStackTop(colorStack);
};
function jkGcTranslate3d(gc, dx, dy, dz) {
    var mat = jkMatrixTranslate3d(dx, dy, dz);
    var stack = jkGcCurrentStack(gc);
    return __setf_jkStackTop(jkMatrixMul(mat, jkStackTop(stack)), stack);
};
function jkGcColor(gc, r, g, b, a) {
    var stack = gc[JKGCCOLORSTACK];
    return __setf_jkStackTop(jkMakeColor(r, g, b, a), stack);
};
function jkGcRotate3d(gc, angle, x, y, z) {
    var mat = jkMatrixRotate3d(angle, x, y, z);
    var stack = jkGcCurrentStack(gc);
    return __setf_jkStackTop(jkMatrixMul(mat, jkStackTop(stack)), stack);
};
function jkGcLoadIdentity(gc) {
    var mat = jkMatrixIdentity(4);
    var stack = jkGcCurrentStack(gc);
    return __setf_jkStackTop(mat, stack);
};
function jkGcPushMatrix(gc) {
    var stack = jkGcCurrentStack(gc);
    var mat = jkMatrixCopy(jkStackTop(stack));
    return jkStackPush(mat, stack);
};
function jkGcPopMatrix(gc) {
    var stack = jkGcCurrentStack(gc);
    return jkStackPop(stack);
};
function jkGcLookAt3d(gc, eye, center, up) {
    var stack = jkGcCurrentStack(gc);
    var mat = jkMatrixLookAt3d(eye, center, up);
    return __setf_jkStackTop(jkMatrixMul(mat, jkStackTop(stack)), stack);
};
function jkGcPerspective(gc, fov, aspect, near, far) {
    var stack = jkGcCurrentStack(gc);
    var mat = jkMatrixPerspective(fov, aspect, near, far);
    return __setf_jkStackTop(jkMatrixMul(mat, jkStackTop(stack)), stack);
};
function jkGcBegin(gc, grcmd) {
    gc[JKGCCURRENTCOMMAND] = grcmd;
    if (grcmd == JKGRCMDLINELOOP) {
        return gc[JKGCCURRENTELEMENT] = jkMakeVertexGroup(grcmd);
    } else if (grcmd == JKGRCMDTEXT2D) {
        return gc[JKGCCURRENTELEMENT] = jkMakeTextVertex();
    } else {
        return jkGcError('unknown grcmd ~a', grcmd);
    };
};
function jkGcEnd(gc) {
    var currentCommand = gc[JKGCCURRENTCOMMAND];
    if (currentCommand == JKGRCMDTEXT2D) {
        var curElem = gc[JKGCCURRENTELEMENT];
        var textBuffer = gc[JKGCTEXTBUFFER];
        return jkBufferAdd(curElem, textBuffer);
    } else {
        var curElem38 = gc[JKGCCURRENTELEMENT];
        var vertexBuf = gc[JKGCVERTEXBUFFER];
        return jkBufferAdd(curElem38, vertexBuf);
    };
};
function jkGcVertex(gc, x, y, z) {
    var cmd = gc[JKGCCURRENTCOMMAND];
    var elem = gc[JKGCCURRENTELEMENT];
    var curColor = jkGcCurrentColor(gc);
    var wpt = jkMakeCvector(x, y, z, 1);
    var mm = jkStackTop(gc[JKGCMODELVIEWSTACK]);
    var cvec = jkMatrixMul(mm, wpt);
    var addVertex = function (elem, cvec) {
        return jkVgAdd(jkMakeVertex(curColor, cvec), elem);
    };
    if (cmd == JKGRCMDTEXT2D) {
        elem[JKTXVCOLOR] = curColor;
        return elem[JKTXVCOORD] = cvec;
    } else {
        return addVertex(elem, cvec);
    };
};
function jkGcText(gc, txt) {
    var curElem = gc[JKGCCURRENTELEMENT];
    var curCmd = gc[JKGCCURRENTCOMMAND];
    if (curCmd == JKGRCMDTEXT2D) {
        return curElem[JKTXVTEXT] = txt;
    } else {
        return jkGcError('text not in text command mode');
    };
};
function jkGcPrepareDeviceMatrix(gc) {
    var viewport = gc[JKGCVIEWPORT];
    var devMode = gc[JKGCDEVICEMODE];
    var left = viewport[JKVIEWPORTLEFT];
    var bottom = viewport[JKVIEWPORTBOTTOM];
    var width = viewport[JKVIEWPORTWIDTH];
    var height = viewport[JKVIEWPORTHEIGHT];
    var w2 = width / 2;
    var h2 = height / 2;
    var hb = height + bottom;
    var mat = jkMakeMatrix(3, 3);
    var dev = jkMakeMatrix(3, 3);
    mat[0][0] = w2;
    mat[0][2] = w2 + left;
    mat[1][1] = h2;
    mat[1][2] = h2 + bottom;
    mat[2][2] = 1;
    if (devMode == JKGCCARTESIANDEVICE) {
        dev[0][0] = 1;
        dev[1][1] = 1;
        dev[2][2] = 1;
    } else if (devMode == JKGCMATRIXDEVICE) {
        dev[0][0] = 1;
        dev[1][1] = -(hb / height);
        dev[1][2] = (hb * hb) / height;
        dev[2][2] = 1;
    } else {
        jkGcError('unknown device mode');
    };
    return gc[JKGCDEVICEMATRIX] = jkMatrixMul(dev, mat);
};
function jkGcEyeCoord(gc, cvec) {
    var modelview = jkStackTop(gc[JKGCMODELVIEWSTACK]);
    return jkMatrixMul(modelview, cvec);
};
function jkGcNormDevCoord(gc, eye) {
    var projection = jkStackTop(gc[JKGCPROJECTIONSTACK]);
    var ndc = jkMatrixMul(projection, eye);
    var w = ndc[3][0];
    ndc[0][0] /= w;
    ndc[1][0] /= w;
    ndc[2][0] /= w;
    ndc[3][0] /= w;
    return ndc;
};
function jkGcDeviceCoord(gc, ndc1) {
    return jkMatrixMul(gc[JKGCDEVICEMATRIX], ndc1);
};
var JKSDMOUSEEVENT = 0;
var JKSDDRAGVECTOR = 1;
var JKSDMAXSIZE = 2;
function jkMakeSimpleDrag(render, prepareDrag, dragVector, finishDrag) {
    var state = 0;
    var p1 = jkMakeVector(0, 0);
    var p2 = jkMakeVector(0, 0);
    var obj = new Array(JKSDMAXSIZE);
    var mouseEvent = function (button, mousePos) {
        if (state == 0) {
            if (button) {
                prepareDrag();
                state = 1;
                __setf_jkVectorMap(mousePos, p1);
                return __setf_jkVectorMap(mousePos, p2);
            };
        } else if (state == 1) {
            if (button) {
                __setf_jkVectorMap(mousePos, p2);
                callDragVector();
                return render();
            } else {
                var vec = jkVectorSub(mousePos, p1);
                state = 0;
                __setf_jkVectorMap(mousePos, p2);
                finishDrag(vec[0], vec[1]);
                __setf_jkVectorMap(p2, p1);
                return render();
            };
        };
    };
    var callDragVector = function () {
        var vec = jkVectorSub(p2, p1);
        return dragVector(vec[0], vec[1]);
    };
    obj[JKSDMOUSEEVENT] = mouseEvent;
    obj[JKSDDRAGVECTOR] = callDragVector;
    return obj;
};
var JKGC = jkMakeGraphicsContext();
var JKEYE = jkMakeCvector(0, 0, 3000, 1);
var JKCENTER = jkMakeCvector(0, 0, 0, 1);
var JKEYEDRAG = null;
var JKCENTERDRAG = null;
var JKALTDRAG = null;
function appGetMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return jkMakeVector(evt.clientX - rect.left, evt.clientY - rect.top);
};
function appJobfileModel() {
    var gc = JKGC;
    var canvasElem = jkDocumentGetElementById('ID1000-CANVAS');
    var savedEye = jkMatrixCopy(JKEYE);
    var savedCenter = jkMatrixCopy(JKCENTER);
    JKEYEDRAG = jkMakeSimpleDrag(appJobfileView, function () {
        __setf_jkMatrixMap(JKEYE, savedEye);
        return __setf_jkMatrixMap(JKCENTER, savedCenter);
    }, function (x, y) {
        var MSG1725 = '';
        var MSGLST1726 = ['eyedrag', x, ',', y];
        var _js40 = MSGLST1726.length;
        for (var _js39 = 0; _js39 < _js40; _js39 += 1) {
            var m = MSGLST1726[_js39];
            MSG1725 += m;
        };
        console.debug(MSG1725);
        JKEYE[0][0] = savedEye[0][0] - x;
        return JKEYE[1][0] = savedEye[1][0] + y;
    }, function (x, y) {
        __setf_jkMatrixMap(savedEye, JKEYE);
        return __setf_jkMatrixMap(savedCenter, JKCENTER);
    });
    JKCENTERDRAG = jkMakeSimpleDrag(appJobfileView, function () {
        __setf_jkMatrixMap(JKEYE, savedEye);
        return __setf_jkMatrixMap(JKCENTER, savedCenter);
    }, function (x, y) {
        JKEYE[0][0] = savedEye[0][0] - x;
        JKEYE[1][0] = savedEye[1][0] + y;
        JKCENTER[0][0] = savedCenter[0][0] - x;
        return JKCENTER[1][0] = savedCenter[1][0] + y;
    }, function (x, y) {
        savedEye[0][0] -= x;
        savedEye[1][0] += y;
        savedCenter[0][0] -= x;
        savedCenter[1][0] += y;
        __setf_jkMatrixMap(savedEye, JKEYE);
        return __setf_jkMatrixMap(savedCenter, JKCENTER);
    });
    JKALTDRAG = jkMakeSimpleDrag(appJobfileView, function () {
        __setf_jkMatrixMap(JKEYE, savedEye);
        return __setf_jkMatrixMap(JKCENTER, savedCenter);
    }, function (x, y) {
        return JKEYE[2][0] = savedEye[2][0] - (savedEye[2][0] / 10) * y;
    }, function (x, y) {
        savedEye[2][0] -= (savedEye[2][0] / 10) * y;
        __setf_jkMatrixMap(savedEye, JKEYE);
        return __setf_jkMatrixMap(savedCenter, JKCENTER);
    });
    canvasElem.addEventListener('mousemove', function (evt) {
        var pos = appGetMousePos(canvasElem, evt);
        JKEYEDRAG[JKSDMOUSEEVENT](evt.ctrlKey, pos);
        JKCENTERDRAG[JKSDMOUSEEVENT](evt.shiftKey, pos);
        return JKALTDRAG[JKSDMOUSEEVENT](evt.altKey, pos);
    });
    JKEYEX = -25;
    JKEYEY = -5;
    JKEYEDX = 20;
    JKEYEDY = 10;
    gc[JKGCDEVICECONTEXT] = jkDocumentGetDc('ID1000-CANVAS');
    jkGcClear(gc, 0);
    jkGcMatrixMode(gc, JKGCPROJECTION);
    jkGcPerspective(gc, 1, 1.333, 0.1, 1000000);
    jkGcMatrixMode(gc, JKGCMODELVIEW);
    jkJsglAjax(gc, './ha/kyjob/json/jobfile/model.json');
    jkGcBegin(gc, JKGRCMDLINELOOP);
    jkGcColor(gc, 0, 0, 0, 1);
    jkGcVertex(gc, 0, 0, 0);
    jkGcVertex(gc, 100, 0, 0);
    jkGcVertex(gc, 100, 100, 0);
    jkGcVertex(gc, 0, 100, 0);
    jkGcEnd(gc);
    jkGcRotate3d(gc, 90, 1, 0, 0);
    jkGcColor(gc, 1, 0, 0, 1);
    jkGcBegin(gc, JKGRCMDLINELOOP);
    jkGcVertex(gc, 0, 0, 0);
    jkGcVertex(gc, 100, 0, 0);
    jkGcVertex(gc, 100, 100, 0);
    jkGcVertex(gc, 0, 100, 0);
    jkGcEnd(gc);
    jkGcTranslate3d(gc, 0, 100, 0);
    jkGcColor(gc, 1, 0, 0, 1);
    jkGcBegin(gc, JKGRCMDLINELOOP);
    jkGcVertex(gc, 0, 0, 0);
    jkGcVertex(gc, 100, 0, 0);
    jkGcVertex(gc, 100, 100, 0);
    jkGcVertex(gc, 0, 100, 0);
    jkGcEnd(gc);
    return jkGcLoadIdentity(gc);
};
function appJobfileView() {
    var gc = JKGC;
    jkGcLookAt3d(gc, JKEYE, JKCENTER, jkMakeCvector(0, 1, 0, 1));
    jkDcClearRect(gc[JKGCDEVICECONTEXT], 0, 0, 1024, 768);
    jkGcFlush(gc);
    return jkGcLoadIdentity(gc);
};
