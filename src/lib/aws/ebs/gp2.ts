import {
  EBSDeviceIopsLimits,
  EBSDevicePerformanceCharacteristics,
  EBSDeviceThroughputLimits,
} from "./common";
import { toBytes } from "./util";

const gp2Constants = {
  blockSize: toBytes(256, "KiB"),
  iops: {
    minimum: 100,
    maximum: 16000,
    burst: 3000,
  },
  throughput: {
    minBaseline: toBytes(128, "MiB"),
    maxBaseline: toBytes(250, "MiB"),
  },
  burst: {
    creditMax: 5400000,
  },
};

/**
 * Calculates the performance characteristics of a gp2 EBS volume.
 *
 * @param volumeSize Volume size (in GiB)
 */
export function gp2VolumePerformanceCharacteristics(
  volumeSize: number
): EBSDevicePerformanceCharacteristics {
  return {
    blockSize: 256 * 1024,
    iops: gp2IopsLimits(volumeSize),
    throughput: gp2ThroughputLimits(volumeSize),
  };
}
export default gp2VolumePerformanceCharacteristics;

/**
 * Calculates the maximum duration (in seconds) that this device can sustain maximum IOPS burst.
 * @param volumeSize Volume size (in GiB)
 * @returns How long (in seconds) this device can sustain full IOPS burst.
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#EBSVolumeTypes_gp2 Amazon EBS volume types (General Purpose SSD volumes (gp2))}
 */
function maxBurstDuration(volumeSize: number): number | undefined {
  const iopsBaseline = volumeSize * 3;

  if (iopsBaseline >= gp2Constants.iops.burst) {
    return undefined;
  }

  const extraIopsWhenBursting = gp2Constants.iops.burst - iopsBaseline;

  const duration = gp2Constants.burst.creditMax / extraIopsWhenBursting;

  // official examples use rounding, where I would have expected floor
  return Math.round(duration);
}

/**
 * Calculates the IOPS limits for a gp2 volume.
 * @param volumeSize Volume size (in GiB)
 * @returns IOPS limits for the volume.
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#solid-state-drives Amazon EBS volume types (Solid state drives)}
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#EBSVolumeTypes_gp2 Amazon EBS volume types (General Purpose SSD volumes (gp2))}
 */
function gp2IopsLimits(volumeSize: number): EBSDeviceIopsLimits {
  const calculatedIops = volumeSize * 3;
  const baseline = Math.min(
    gp2Constants.iops.maximum,
    Math.max(gp2Constants.iops.minimum, calculatedIops)
  );

  const burstDuration = maxBurstDuration(volumeSize);

  // can only burst if baseline is beneath the burst value
  if (burstDuration) {
    return {
      baseline,
      burst: {
        value: gp2Constants.iops.burst,
        duration: burstDuration,
      },
    };
  }

  return {
    baseline,
  };
}

/**
 * Calculates the throughput limits for a gp2 volume.
 * @param volumeSize Volume size (in GiB)
 * @returns Throughput limits for the volume.
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#solid-state-drives Amazon EBS volume types (Solid state drives)}
 * @see {@link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#EBSVolumeTypes_gp2 Amazon EBS volume types (General Purpose SSD volumes (gp2))}
 */
function gp2ThroughputLimits(volumeSize: number): EBSDeviceThroughputLimits {
  const baseline =
    volumeSize < 334
      ? gp2Constants.throughput.minBaseline
      : gp2Constants.throughput.maxBaseline;

  if (volumeSize > 170 && volumeSize < 334) {
    return {
      baseline,
      burst: {
        value: gp2Constants.throughput.maxBaseline,
        duration: maxBurstDuration(volumeSize),
      },
    };
  }

  return {
    baseline,
  };
}
