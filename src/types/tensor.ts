export interface DataTypeMap {
  float32: Float32Array;
  uint8: Uint8Array;
  int8: Int8Array;
  uint16: Uint16Array;
  int16: Int16Array;
  int32: Int32Array;
  int64: BigInt64Array;
  string: string[];
  bool: Uint8Array;
  float16: Uint16Array;  // Keep using Uint16Array until we have a concrete solution for float 16.
  float64: Float64Array;
  uint32: Uint32Array;
  uint64: BigUint64Array;
  // complex64: never;
  // complex128: never;
  // bfloat16: never;
}