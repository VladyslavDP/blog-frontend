/* tslint:disable */
/* eslint-disable */
/**
 * Blog Core API
 * Blog Core API description
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CognitoSignInTokenResponseDto
 */
export interface CognitoSignInTokenResponseDto {
    /**
     * Access token for authenticated requests
     * @type {string}
     * @memberof CognitoSignInTokenResponseDto
     */
    accessToken: string;
    /**
     * Refresh token for renewing the session
     * @type {string}
     * @memberof CognitoSignInTokenResponseDto
     */
    refreshToken: string;
    /**
     * Expiration time of the access token in seconds
     * @type {number}
     * @memberof CognitoSignInTokenResponseDto
     */
    expiresIn: number;
}

/**
 * Check if a given object implements the CognitoSignInTokenResponseDto interface.
 */
export function instanceOfCognitoSignInTokenResponseDto(value: object): value is CognitoSignInTokenResponseDto {
    if (!('accessToken' in value) || value['accessToken'] === undefined) return false;
    if (!('refreshToken' in value) || value['refreshToken'] === undefined) return false;
    if (!('expiresIn' in value) || value['expiresIn'] === undefined) return false;
    return true;
}

export function CognitoSignInTokenResponseDtoFromJSON(json: any): CognitoSignInTokenResponseDto {
    return CognitoSignInTokenResponseDtoFromJSONTyped(json, false);
}

export function CognitoSignInTokenResponseDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CognitoSignInTokenResponseDto {
    if (json == null) {
        return json;
    }
    return {
        
        'accessToken': json['AccessToken'],
        'refreshToken': json['RefreshToken'],
        'expiresIn': json['ExpiresIn'],
    };
}

export function CognitoSignInTokenResponseDtoToJSON(json: any): CognitoSignInTokenResponseDto {
    return CognitoSignInTokenResponseDtoToJSONTyped(json, false);
}

export function CognitoSignInTokenResponseDtoToJSONTyped(value?: CognitoSignInTokenResponseDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'AccessToken': value['accessToken'],
        'RefreshToken': value['refreshToken'],
        'ExpiresIn': value['expiresIn'],
    };
}

