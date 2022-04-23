/** Describes the burst and baseline throughput limits for an EBS volume.
 *
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html Amazon EBS volume types}
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-io-characteristics.html EBS I/O characteristics and monitoring}
 */
export interface EBSDeviceThroughputLimits {
  /** Baseline throughput limit (in bytes per second)
   *
   * If undefined, this indicates the device's throughput is only limited by the
   * (block size * IOPS limit) relationship.
   */
  baseline?: number;

  /** Burst throughput limits.
   *
   * If undefined, this indicates that the device does not support throughput burst.
   */
  burst?: {
    /** Maximum burst throughput limit (in bytes per second). */
    value: number;
    /** Duration (in seconds) that the device can sustain maximum burst throughput. */
    duration: number;
  };
}

/** Describes the burst and baseline IOPS limits for an EBS volume.
 *
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html Amazon EBS volume types}
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-io-characteristics.html EBS I/O characteristics and monitoring}
 */
export interface EBSDeviceIopsLimits {
  /** Baseline IOPS limit (in I/O operations per second).
   */
  baseline: number;

  /** Burst IOPS limits.
   *
   * If undefined, this indicates that the device does not support IOPS burst.
   */
  burst?: {
    /** Maximum burst IOPS limit (in I/O operations per second). */
    value: number;
    /** Duration (in seconds) that the device can sustain maximum burst IOPS. */
    duration: number;
  };
}

/** Describes the parameters that define the performance characteristics of an EBS volume in isolation.
 *
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html Amazon EBS volume types}
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-io-characteristics.html EBS I/O characteristics and monitoring}
 */
export interface EBSDevicePerformanceCharacteristics {
  /** I/O Block size (in bytes). */
  blockSize: number;
  throughput: EBSDeviceThroughputLimits;
  iops: EBSDeviceIopsLimits;
}
