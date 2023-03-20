import GenAIObject from './GenAIObject';
import LayerInterface from './LayerInterface';

export default class GenAISetting extends GenAIObject {
  id!: string;
  name: string;
  generationModelName: string;
  currentLayer: LayerInterface;
  tempLayer: LayerInterface;
  docType: string;
  prompt: string;
  promptPrefix: string;
  promptSuffix: string;
  negativePrompt: string;
  stylingStrength: number;
  consistencyStrength: number;
  imageHeight: number;
  imageWidth: number;
  batchSize: number;
  seed: number;
  model_config: string;
  is_cloud_run: boolean;
  isGenerating: boolean;

  constructor(
    options: any = {
      currentLayer: null,
      name: null,
      generationModelName: 'model.ckpt',
      docType: 'illustration',
      currentPrompt: '',
      imageHeight: 1024,
      imageWidth: 1024,
      consistencyStrength: 0.7,
      stylingStrength: 0.7,
      negativePrompt: '',
      tempLayer: null,
      seed: -1,
      batchSize: 1,
      tags: {},
      model_config: 'OpenJourney-Config',
      is_cloud_run: true,
      isGenerating: false,
      promptPrefix: '',
      promptSuffix: '',
    },
  ) {
    super();
    this.name = options.name;
    this.currentLayer = options.currentLayer;
    this.generationModelName = options.generationModelName;
    this.prompt = options.prompt;
    this.promptPrefix = options.promptPrefix;
    this.promptSuffix = options.promptSuffix;
    this.imageHeight = options.imageHeight;
    this.imageWidth = options.imageHeight;
    this.consistencyStrength = options.consistencyStrength;
    this.stylingStrength = options.stylingStrength;
    this.negativePrompt = options.negativePrompt;
    this.tempLayer = options.tempLayer;
    this.docType = options.docType;
    this.batchSize = options.batchSize;
    this.seed = options.seed;
    this.model_config = options.model_config;
    this.is_cloud_run = options.is_cloud_run;
    this.isGenerating = options.isGenerating;
  }

  public async hasLayerMask(): Promise<boolean> {
    return await this.currentLayer.hasMask();
  }

  public async applyLayerMask(): Promise<boolean> {
    if (await this.hasLayerMask()) {
      await this.currentLayer.applyMask();
      return true;
    }
    return false;
  }

  public async duplicateCurrentLayer(): Promise<LayerInterface> {
    return await this.currentLayer.duplicate();
  }

  public getStylingStrength() {
    return 20 * this.stylingStrength;
  }

  /**
   * The consistency strength is just the amount of denoising will occur.  30 is the max amount of noise in the API.  So we are letting the user
   * set the percentage of noise they want to have.  The higher the number the more noise, it is confusing so we are inversing that for the user and calling it
   * `consistency strength`.  So for the most noise, we will set the consistency strength to 0. for the least noise, we will set the consistency strength to 1.
   * @returns
   */
  public getDenoisingStrength() {
    return 1 - this.consistencyStrength;
  }
}
