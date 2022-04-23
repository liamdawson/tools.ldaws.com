import { EBSDeviceIopsLimits } from "./common";
import gp2VolumePerformanceCharacteristics from "./gp2";

const gp2Constants = {
  burstIops: 3000,
  // maximumIops: 3000,
  minimumIops: 100,
  burstCreditMax: 5400000,
};

describe("EBS gp2 volume calculator", () => {
  // https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html#EBSVolumeTypes_gp2
  // Volume size, Baseline IOPS, Max burst (@ 3,000 IOPS) duration
  const gp2IopsTable = [
    [1, 100, 1802],
    [100, 300, 2000],
    [250, 750, 2400],
    [334, 1002, 2703],
    [500, 1500, 3600],
    [750, 2250, 7200],
    [1000, 3000, undefined],
    [5334, 16000, undefined],
    [16384, 16000, undefined],
  ];

  test.each(gp2IopsTable)(
    "for a %i GiB volume, it calculates the IOPS characteristics correctly",
    (size, baselineIops, maxBurstDuration) => {
      const expected: EBSDeviceIopsLimits = {
        baseline: baselineIops,
      };

      if (maxBurstDuration) {
        expected.burst = {
          value: gp2Constants.burstIops,
          duration: maxBurstDuration,
        };
      }

      expect(gp2VolumePerformanceCharacteristics(size).iops).toStrictEqual(
        expected
      );
    }
  );
});
