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
     * @param {{customData: FontFaceFeatureConfig; withAttrs?: Record<string, any>; [key: string]: any}} featureConfig 
     */
    static async onAssigned(
        ctr,
        featureConfig
    ){
        const { customData, withAttrs } = featureConfig;
        const { fontFamily } = customData;
        const fontFamilies = Array.isArray(fontFamily) ? fontFamily : [fontFamily];
        for(const fontConfig of fontFamilies){
            const { name, url, descriptors } = fontConfig;
            const fontFace = new FontFace(name, `url(${url})`, descriptors);
            await fontFace.load();
            document.fonts.add(fontFace);
        }
    }
}