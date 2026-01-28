import { apiPost, apiGet, apiUpdate, apiDelete } from './apiHelper';

/**
 * Project API endpoints
 */
export const projectAPI = {
  /**
   * Get all projects
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  getAll: (onSuccess, onError) =>
    apiGet('/projects/', onSuccess, onError),

  /**
   * Get project by ID
   * @param {number} id - Project ID
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  getById: (id, onSuccess, onError) =>
    apiGet(`/projects/${id}/`, onSuccess, onError),

  /**
   * Create new project
   * @param {object} projectData - Project details
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  create: (projectData, onSuccess, onError) =>
    apiPost('/projects/', projectData, onSuccess, onError),

  /**
   * Update project
   * @param {number} id - Project ID
   * @param {object} projectData - Updated project details
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  update: (id, projectData, onSuccess, onError) =>
    apiUpdate(`/projects/${id}/`, projectData, onSuccess, onError),

  /**
   * Delete project
   * @param {number} id - Project ID
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  delete: (id, onSuccess, onError) =>
    apiDelete(`/projects/${id}/`, onSuccess, onError),

  /**
   * Get project members/team
   * @param {number} id - Project ID
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  getTeam: (id, onSuccess, onError) =>
    apiGet(`/projects/${id}/team/`, onSuccess, onError),

  /**
   * Add team member to project
   * @param {number} projectId - Project ID
   * @param {object} memberData - Member details
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  addTeamMember: (projectId, memberData, onSuccess, onError) =>
    apiPost(`/projects/${projectId}/team/`, memberData, onSuccess, onError),

  /**
   * Remove team member from project
   * @param {number} projectId - Project ID
   * @param {number} memberId - Member ID
   * @param {function} onSuccess - Success callback
   * @param {function} onError - Error callback
   */
  removeTeamMember: (projectId, memberId, onSuccess, onError) =>
    apiDelete(`/projects/${projectId}/team/${memberId}/`, onSuccess, onError),
};

export default projectAPI;
