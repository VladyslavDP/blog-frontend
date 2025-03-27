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

import type { CognitoSignInResponseDto } from './CognitoSignInResponseDto';
import {
    instanceOfCognitoSignInResponseDto,
    CognitoSignInResponseDtoFromJSON,
    CognitoSignInResponseDtoFromJSONTyped,
    CognitoSignInResponseDtoToJSON,
} from './CognitoSignInResponseDto';
import type { CognitoSignInTokenResponseDto } from './CognitoSignInTokenResponseDto';
import {
    instanceOfCognitoSignInTokenResponseDto,
    CognitoSignInTokenResponseDtoFromJSON,
    CognitoSignInTokenResponseDtoFromJSONTyped,
    CognitoSignInTokenResponseDtoToJSON,
} from './CognitoSignInTokenResponseDto';

/**
 * @type AuthControllerSignIn200Response
 * 
 * @export
 */
export type AuthControllerSignIn200Response = CognitoSignInResponseDto | CognitoSignInTokenResponseDto;

export function AuthControllerSignIn200ResponseFromJSON(json: any): AuthControllerSignIn200Response {
    return AuthControllerSignIn200ResponseFromJSONTyped(json, false);
}

export function AuthControllerSignIn200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthControllerSignIn200Response {
    if (json == null) {
        return json;
    }
    if (instanceOfCognitoSignInResponseDto(json)) {
        return CognitoSignInResponseDtoFromJSONTyped(json, true);
    }
    if (instanceOfCognitoSignInTokenResponseDto(json)) {
        return CognitoSignInTokenResponseDtoFromJSONTyped(json, true);
    }

    return {} as any;
}

export function AuthControllerSignIn200ResponseToJSON(json: any): any {
    return AuthControllerSignIn200ResponseToJSONTyped(json, false);
}

export function AuthControllerSignIn200ResponseToJSONTyped(value?: AuthControllerSignIn200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    if (instanceOfCognitoSignInResponseDto(value)) {
        return CognitoSignInResponseDtoToJSON(value as CognitoSignInResponseDto);
    }
    if (instanceOfCognitoSignInTokenResponseDto(value)) {
        return CognitoSignInTokenResponseDtoToJSON(value as CognitoSignInTokenResponseDto);
    }

    return {};
}

