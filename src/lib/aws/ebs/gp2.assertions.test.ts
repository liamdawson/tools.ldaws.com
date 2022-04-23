// These are assertions I use to guess at how these performance characteristics are used

import { EBSDevicePerformanceCharacteristics } from "./common";
import gp2VolumePerformanceCharacteristics from "./gp2";
import { toBytes } from "./util";

const baselineThroughputBasedOnIops = (
  characteristics: EBSDevicePerformanceCharacteristics
) => characteristics.iops.baseline * characteristics.blockSize;

test("a 333 GiB volume needs burst credits to reach 250 MiB/s, because that requires 3,000 IOPS", () => {
  const subject = gp2VolumePerformanceCharacteristics(333);

  expect(baselineThroughputBasedOnIops(subject)).toBeLessThan(
    toBytes(250, "MiB")
  );
});

test("a 334 GiB volume does not need burst credits to reach 250 MiB/s, because it has a sufficiently large baseline", () => {
  const subject = gp2VolumePerformanceCharacteristics(334);

  expect(baselineThroughputBasedOnIops(subject)).toBeGreaterThanOrEqual(
    toBytes(250, "MiB")
  );
});
