import axiosInstance from '../utils/axiosInstance';

/**
 * Get all available subscription plans
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - plans: {Array<Object>} - List of subscription plans
 *     - id: {number} - Plan ID
 *     - name: {string} - Plan name (e.g., Free, Silver, Gold, Diamond)
 *     - description: {string} - Plan description
 *     - price: {number} - Plan price
 *     - duration: {number} - Plan duration in days
 *     - maxMembers: {number} - Maximum team members allowed
 *     - maxJobPostings: {number} - Maximum total job postings allowed
 *     - maxActiveJobs: {number} - Maximum active jobs allowed at once
 *     - features: {string} - JSON string of features included
 *     - isActive: {boolean} - Whether the plan is active
 *     - createdAt: {string} - Creation date
 *     - updatedAt: {string} - Last update date
 */
export const getSubscriptionPlans = async () => {
  return axiosInstance.post('/subscriptions/get-all-plans');
};

/**
 * Get the current user's active subscription
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if the request was successful
 *   - subscription: {Object|null} - Current subscription data or null if no active subscription
 *     - id: {number} - Subscription ID
 *     - userId: {number} - User ID
 *     - planId: {number} - Plan ID
 *     - startDate: {string} - Start date
 *     - endDate: {string} - End date
 *     - isActive: {boolean} - Whether the subscription is active
 *     - paymentStatus: {string} - Payment status
 *     - paymentMethod: {string} - Payment method
 *     - transactionId: {string} - Transaction ID
 *     - autoRenew: {boolean} - Whether the subscription auto-renews
 *     - plan: {Object} - Associated plan data
 *   - message: {string} - Status message (when subscription is null)
 */
export const getCurrentSubscription = async () => {
  return axiosInstance.post('/subscriptions/get-current-subscription');
};

/**
 * Subscribe to a plan
 * @param {Object} subscriptionData - Subscription data
 * @param {number} subscriptionData.planId - ID of the plan to subscribe to
 * @param {string} [subscriptionData.paymentMethod='credit_card'] - Payment method
 * @param {boolean} [subscriptionData.autoRenew=false] - Whether to auto-renew the subscription
 * @param {string} [subscriptionData.transactionId] - Transaction ID from payment processor
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if subscription was created successfully
 *   - message: {string} - Success or error message
 *   - subscription: {Object} - Created subscription data
 *   - planName: {string} - Name of the subscribed plan
 */
export const subscribe = async (subscriptionData) => {
  return axiosInstance.post('/subscriptions/create-subscription', subscriptionData);
};

/**
 * Update an existing subscription (upgrade/downgrade)
 * @param {Object} updateData - Update data
 * @param {number} updateData.planId - ID of the new plan
 * @param {boolean} [updateData.autoRenew] - Whether to auto-renew the subscription
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if subscription was updated successfully
 *   - message: {string} - Success or error message
 *   - subscription: {Object} - Updated subscription data with plan information
 */
export const updateSubscription = async (updateData) => {
  return axiosInstance.post('/subscriptions/update-subscription', updateData);
};

/**
 * Cancel the current subscription
 * @returns {Promise<Object>} Response containing:
 *   - success: {boolean} - Indicates if subscription was cancelled successfully
 *   - message: {string} - Success or error message
 */
export const cancelSubscription = async () => {
  return axiosInstance.post('/subscriptions/cancel-subscription');
}; 