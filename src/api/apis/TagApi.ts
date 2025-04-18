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


import * as runtime from '../runtime';
import type {
  TagControllerGetTags200Response,
  TagCreateDto,
  TagUpdateDto,
} from '../models/index';
import {
    TagControllerGetTags200ResponseFromJSON,
    TagControllerGetTags200ResponseToJSON,
    TagCreateDtoFromJSON,
    TagCreateDtoToJSON,
    TagUpdateDtoFromJSON,
    TagUpdateDtoToJSON,
} from '../models/index';

export interface TagControllerCreateTagRequest {
    tagCreateDto: TagCreateDto;
}

export interface TagControllerDeleteTagRequest {
    tagId: string;
}

export interface TagControllerGetTagsRequest {
    page?: number;
    size?: number;
}

export interface TagControllerUpdateTagRequest {
    tagId: string;
    tagUpdateDto: TagUpdateDto;
}

/**
 * 
 */
export class TagApi extends runtime.BaseAPI {

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Create tag
     */
    async tagControllerCreateTagRaw(requestParameters: TagControllerCreateTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['tagCreateDto'] == null) {
            throw new runtime.RequiredError(
                'tagCreateDto',
                'Required parameter "tagCreateDto" was null or undefined when calling tagControllerCreateTag().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tag/create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TagCreateDtoToJSON(requestParameters['tagCreateDto']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Create tag
     */
    async tagControllerCreateTag(requestParameters: TagControllerCreateTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.tagControllerCreateTagRaw(requestParameters, initOverrides);
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Delete tag
     */
    async tagControllerDeleteTagRaw(requestParameters: TagControllerDeleteTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['tagId'] == null) {
            throw new runtime.RequiredError(
                'tagId',
                'Required parameter "tagId" was null or undefined when calling tagControllerDeleteTag().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tag/delete/{tagId}`.replace(`{${"tagId"}}`, encodeURIComponent(String(requestParameters['tagId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Delete tag
     */
    async tagControllerDeleteTag(requestParameters: TagControllerDeleteTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.tagControllerDeleteTagRaw(requestParameters, initOverrides);
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Get all tags
     */
    async tagControllerGetTagsRaw(requestParameters: TagControllerGetTagsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TagControllerGetTags200Response>> {
        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['size'] != null) {
            queryParameters['size'] = requestParameters['size'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tag`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TagControllerGetTags200ResponseFromJSON(jsonValue));
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Get all tags
     */
    async tagControllerGetTags(requestParameters: TagControllerGetTagsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TagControllerGetTags200Response> {
        const response = await this.tagControllerGetTagsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Update tag
     */
    async tagControllerUpdateTagRaw(requestParameters: TagControllerUpdateTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['tagId'] == null) {
            throw new runtime.RequiredError(
                'tagId',
                'Required parameter "tagId" was null or undefined when calling tagControllerUpdateTag().'
            );
        }

        if (requestParameters['tagUpdateDto'] == null) {
            throw new runtime.RequiredError(
                'tagUpdateDto',
                'Required parameter "tagUpdateDto" was null or undefined when calling tagControllerUpdateTag().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/tag/update/{tagId}`.replace(`{${"tagId"}}`, encodeURIComponent(String(requestParameters['tagId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TagUpdateDtoToJSON(requestParameters['tagUpdateDto']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Protected endpoint. Requires Bearer token for authentication. Available roles – user
     * 🔐 Update tag
     */
    async tagControllerUpdateTag(requestParameters: TagControllerUpdateTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.tagControllerUpdateTagRaw(requestParameters, initOverrides);
    }

}
