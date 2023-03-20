export default interface LayerInterface {
  name: string;
  hasMask(): Promise<boolean>;
  applyMask(): Promise<boolean>;
  duplicate(): Promise<LayerInterface>;
}
