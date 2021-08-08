import * as superagent from 'superagent';

import { githubConfig } from './config';
import { CommitCreated, CommitGet } from './types';

export type NotFound = { message: string, documentation_url: string };

export const getFileFromGithub = (fileName: string): Promise<CommitGet | NotFound> => {
    return new Promise((resolve, _) => {

        superagent.get(`https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}/${fileName}?ref=${githubConfig.branch}`)
            .accept('application/vnd.github.v3+json')
            .auth(githubConfig.username, githubConfig.token, { type: "basic" }).then(res => {
                if (res.statusCode == 200) {
                    resolve(res.body);
                } else if (res.statusCode == 404) {
                    resolve(res.body as NotFound);
                }
            }).catch(err => {
                console.log(typeof err);
                console.log(err.message);
                resolve(JSON.parse(err.message))
            });
    })
}

export const commitFileToGithub = (fileName: string, content: string, message: string, sha?: string): Promise<CommitCreated> => {
    return new Promise(async (resolve, reject) => {
        let res = await superagent.put(`https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}/${fileName}`)
            .accept('application/vnd.github.v3+json')
            .auth(githubConfig.username, githubConfig.token, { type: "basic" })
            .send({
                message,
                content,
                sha,
                branch: githubConfig.branch
            })

        if (res.statusCode == 201) {
            resolve(res.body as CommitCreated);
        } else {
            reject(res.error);
        }
    });
}