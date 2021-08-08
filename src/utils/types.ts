import { CssStyle } from "../buildCssString";
import { UnitType } from "../buildSizeStringByUnit";
import { UserComponentSetting } from "../userComponentSetting";

export interface CommitCreated {
    content: Content;
    commit: Commit;
}

export interface Commit {
    sha: string;
    node_id: string;
    url: string;
    html_url: string;
    author: Author;
    committer: Author;
    tree: Tree;
    message: string;
    parents: Parent[];
    verification: Verification;
}

export interface Author {
    name: string;
    email: string;
    date: string;
}

export interface Parent {
    sha: string;
    url: string;
    html_url: string;
}

export interface Tree {
    sha: string;
    url: string;
}

export interface Verification {
    verified: boolean;
    reason: string;
    signature: null;
    payload: null;
}

export interface Content {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: Links;
}

export interface Links {
    self: string;
    git: string;
    html: string;
}

export interface CommitGet {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content: string;
    encoding: string;
    _links: Links;
}


export interface ComponentData {
    componentName: string;
    cssString: string;
    userComponentSettings: UserComponentSetting[];
    cssStyle: CssStyle;
    generatedCodeStr: string;
    unitType: UnitType;
}