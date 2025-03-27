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
 * @interface PostDto
 */
export interface PostDto {
    /**
     * The unique identifier of the post
     * @type {string}
     * @memberof PostDto
     */
    id: string;
    /**
     * The title of the post
     * @type {string}
     * @memberof PostDto
     */
    title: string;
    /**
     * The slug for the post
     * @type {string}
     * @memberof PostDto
     */
    slug: string;
    /**
     * Array of tag names associated with the post
     * @type {Array<string>}
     * @memberof PostDto
     */
    tags: Array<string>;
    /**
     * Time to read the post, in minutes
     * @type {number}
     * @memberof PostDto
     */
    timeToRead: number;
    /**
     * The creation timestamp of the post
     * @type {Date}
     * @memberof PostDto
     */
    createdAt: Date;
    /**
     * The last update timestamp of the post
     * @type {Date}
     * @memberof PostDto
     */
    updatedAt: Date;
}

/**
 * Check if a given object implements the PostDto interface.
 */
export function instanceOfPostDto(value: object): value is PostDto {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('slug' in value) || value['slug'] === undefined) return false;
    if (!('tags' in value) || value['tags'] === undefined) return false;
    if (!('timeToRead' in value) || value['timeToRead'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    return true;
}

export function PostDtoFromJSON(json: any): PostDto {
    return PostDtoFromJSONTyped(json, false);
}

export function PostDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'slug': json['slug'],
        'tags': json['tags'],
        'timeToRead': json['timeToRead'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
    };
}

export function PostDtoToJSON(json: any): PostDto {
    return PostDtoToJSONTyped(json, false);
}

export function PostDtoToJSONTyped(value?: PostDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'slug': value['slug'],
        'tags': value['tags'],
        'timeToRead': value['timeToRead'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
    };
}

