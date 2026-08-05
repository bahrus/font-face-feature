//@ts-check
/** @import { FontFaceFeatureConfig } from './types/font-face-feature/types.d.ts'; */

export class FontFaceFeature {

    /**
     * Called once by `assignFeatures` after registration.
     * Pre-loads processor modules and installs prototype getter/setters.
     * Also ensures sourceOfTruth attributes are added to observedAttributes.
     * 
     */


    /**
     * 
     * @param {{ new(...args: any[]): any; prototype: any; observedAttributes?: string[] }} ctr 
     * @param {{customData: {fontFaceFeatureConfig: FontFaceFeatureConfig;}; withAttrs?: Record<string, any>; [key: string]: any}} featureConfig 
     */
    static async onAssigned(
        ctr,
        featureConfig
    ){
        const { customData, withAttrs } = featureConfig;
        const { fontFaceFeatureConfig } = customData;
        const { fontFamilies } = fontFaceFeatureConfig;
        const fontFamiliesList = Array.isArray(fontFamilies) ? fontFamilies : [fontFamilies];
        for(const fontConfig of fontFamiliesList){
            const { name, url, descriptors } = fontConfig;
            const fontFace = new FontFace(name, `url(${url})`, descriptors);
            await fontFace.load();
            document.fonts.add(fontFace);
        }
    }
}