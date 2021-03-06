/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {NonMaxSuppressionV5, NonMaxSuppressionV5Attrs, NonMaxSuppressionV5Inputs} from '../../../kernel_names';
import {KernelConfig} from '../../../kernel_registry';
import {warn} from '../../../log';
import {TypedArray} from '../../../types';
import {nonMaxSuppressionV5} from '../../non_max_suppression_impl';

import {MathBackendWebGL} from '../backend_webgl';

export const nonMaxSuppressionV5Config: KernelConfig = {
  kernelName: NonMaxSuppressionV5,
  backendName: 'webgl',
  kernelFunc: ({inputs, backend, attrs}) => {
    warn(
        'tf.nonMaxSuppression() in webgl locks the UI thread. ' +
        'Call tf.nonMaxSuppressionAsync() instead');

    const {boxes, scores} = inputs as NonMaxSuppressionV5Inputs;
    const {maxOutputSize, iouThreshold, scoreThreshold, softNmsSigma} =
        attrs as unknown as NonMaxSuppressionV5Attrs;

    const gpuBackend = backend as MathBackendWebGL;

    const boxesVals = gpuBackend.readSync(boxes.dataId) as TypedArray;
    const scoresVals = gpuBackend.readSync(scores.dataId) as TypedArray;

    const maxOutputSizeVal = maxOutputSize;
    const iouThresholdVal = iouThreshold;
    const scoreThresholdVal = scoreThreshold;
    const softNmsSigmaVal = softNmsSigma;

    const {selectedIndices, selectedScores} = nonMaxSuppressionV5(
        boxesVals, scoresVals, maxOutputSizeVal, iouThresholdVal,
        scoreThresholdVal, softNmsSigmaVal);

    return [selectedIndices, selectedScores];
  }
};
