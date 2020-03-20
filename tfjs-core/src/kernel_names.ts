/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
// Allow UpperCamelCase variable names
// tslint:disable: variable-name
// Unfortunately just enabling PascalCase per file (tslint:enable:
// allow-pascal-case) doesn't work.
import {NamedTensorInfoMap} from './kernel_registry';
import {PixelData} from './types';

export type BinaryInputs = Pick<NamedTensorInfoMap, 'a'|'b'>;

export const Div = 'Div';

export const Exp = 'Exp';
export type ExpInputs = Pick<NamedTensorInfoMap, 'x'>;

export const Max = 'Max';
export type MaxInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface MaxAttrs {
  axes: number[];
}

export const Softmax = 'Softmax';
export type SoftmaxInputs = Pick<NamedTensorInfoMap, 'logits'>;
export interface SoftmaxAttrs {
  dim: number;
}

export const SquaredDifference = 'SquaredDifference';

export const Square = 'Square';
export type SquareInputs = Pick<NamedTensorInfoMap, 'x'>;

export const Sub = 'Sub';

export const Sum = 'Sum';
export type SumInputs = Pick<NamedTensorInfoMap, 'x'>;
export interface SumAttrs {
  axes: number[];
}

export const NonMaxSuppressionV5 = 'NonMaxSuppressionV5';
export type NonMaxSuppressionV5Inputs =
    Pick<NamedTensorInfoMap, 'boxes'|'scores'>;
export interface NonMaxSuppressionV5Attrs {
  maxOutputSize: number;
  iouThreshold: number;
  scoreThreshold: number;
  softNmsSigma: number;
}

/**
 * TensorFlow.js-only kernels
 */
export const FromPixels = 'FromPixels';
export interface FromPixelsInputs {
  pixels: PixelData|ImageData|HTMLImageElement|HTMLCanvasElement|
      HTMLVideoElement;
}
export interface FromPixelsAttrs {
  numChannels: number;
}
