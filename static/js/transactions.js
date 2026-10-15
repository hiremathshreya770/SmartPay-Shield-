/**
 * EASY PAY — SAFE PAY
 * TRANSACTION HISTORY & SAFETY INSIGHTS
 *
 * Provides senior-friendly search, status filtering, risk classification filtering,
 * date sorting, and calculation of demo statistics.
 */

class TransactionHistoryManager {
  constructor() {
    this.searchInput = document.getElementById('txnSearchInput');
    this.statusFilter = document.getElementById('txnStatusFilter');
    this.riskFilter = document.getElementById('txnRiskFilter');
    this.sortOrder = document.getElementById('txnSortOrder');
    this.btnReset = document.getElementById('btnResetFilters');
    this.container = document.getElementById('transactionsListContainer');
    this.emptyState = document.getElementById('txnEmptyState');
    this.countDisplay = document.getElementById('filteredResultsCount');
    this.statCompletedCount = document.getElementById('statCompletedCount');
    this.statCompletedTotal = document.getElementById('statCompletedTotal');
    this.statRiskyCount = document.getElementById('statRiskyCount');
    this.btnReadPage = document.getElementById('btnReadTxnPage');
    this.btnStopAudio = document.getElementById('btnStopTxnAudio');

    this.debounceTimer = null;
    this.init();
  }

  init() {
    // 1. Search with debounce
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.fetchFilteredTransactions(), 250);
      });
    }

    // 2. Filter dropdowns
    if (this.statusFilter) {
      this.statusFilter.addEventListener('change', () => this.fetchFilteredTransactions());
    }

    if (this.riskFilter) {
      this.riskFilter.addEventListener('change', () => this.fetchFilteredTransactions());
    }

    if (this.sortOrder) {
      this.sortOrder.addEventListener('change', () => this.fetchFilteredTransactions());
    }

    // 3. Reset Button
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        if (this.searchInput) this.searchInput.value = '';
        if (this.statusFilter) this.statusFilter.value = 'all';
        if (this.riskFilter) this.riskFilter.value = 'all';
        if (this.sortOrder) this.sortOrder.value = 'DESC';
        this.fetchFilteredTransactions();
      });
    }

    // 4. Audio Read Aloud
    if (this.btnReadPage) {
      this.btnReadPage.addEventListener('click', () => this.readSummaryAloud());
    }

    if (this.btnStopAudio) {
      this.btnStopAudio.addEventListener('click', () => {
        if (window.voiceEngine && typeof window.voiceEngine.stop === 'function') {
          window.voiceEngine.stop();
        }
        if (this.btnStopAudio) this.btnStopAudio.style.display = 'none';
      });
    }

    // 5. Initial load from database to guarantee all practice UPI transactions appear
    this.fetchFilteredTransactions();
  }

  async fetchFilteredTransactions() {
    const search = this.searchInput ? this.searchInput.value.trim() : '';
    const status = this.statusFilter ? this.statusFilter.value : 'all';
    const risk = this.riskFilter ? this.riskFilter.value : 'all';
    const sort = this.sortOrder ? this.sortOrder.value : 'DESC';

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status && status !== 'all') params.append('status', status);
    if (risk && risk !== 'all') params.append('risk', risk);
    if (sort) params.append('sort', sort);

    try {
      const res = await fetch(`/api/transactions?${params.toString()}`);
      const data = await res.json();

      if (data.status === 'success') {
        this.renderTransactions(data.transactions || []);
        this.updateStats(data.stats || {});
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  }

  updateStats(stats) {
    if (this.statCompletedCount && stats.successful_demo_transactions_count !== undefined) {
      this.statCompletedCount.textContent = stats.successful_demo_transactions_count;
    }
    if (this.statCompletedTotal && stats.successful_demo_transactions_total) {
      this.statCompletedTotal.textContent = stats.successful_demo_transactions_total;
    }
    if (this.statRiskyCount && stats.risky_demo_transactions_count !== undefined) {
      this.statRiskyCount.textContent = stats.risky_demo_transactions_count;
    }
  }

  renderTransactions(transactions) {
    if (!this.container) return;

    if (!transactions || transactions.length === 0) {
      this.container.innerHTML = '';
      if (this.emptyState) this.emptyState.style.display = 'block';
      if (this.countDisplay) this.countDisplay.textContent = 'Showing 0 demonstration transactions';
      return;
    }

    if (this.emptyState) this.emptyState.style.display = 'none';
    if (this.countDisplay) {
      this.countDisplay.textContent = `Showing ${transactions.length} demonstration transaction${transactions.length === 1 ? '' : 's'}`;
    }

    this.container.innerHTML = transactions.map(txn => {
      const isHighRisk = txn.risk_classification === 'HIGH RISK';
      const isCaution = txn.risk_classification === 'CAUTION';
      const borderColor = isHighRisk ? '#F87171' : (isCaution ? '#FBBF24' : 'var(--border-light)');
      const riskBadgeClass = isHighRisk ? 'badge-high-risk' : (isCaution ? 'badge-suspicious' : 'badge-clean');
      const riskIcon = isHighRisk ? '🚨' : (isCaution ? '⚠️' : '🏪');
      const riskBadgeText = isHighRisk ? '🚨 HIGH RISK' : (isCaution ? '⚠️ CAUTION' : '✔ NO OBVIOUS WARNING SIGNS');
      const statusClass = txn.status === 'Completed' ? 'status-success' : 'status-danger';

      return `
        <article class="transaction-item-card" data-ref="${this.escapeHtml(txn.txn_ref)}" style="background: #FFFFFF; border: 2px solid ${borderColor}; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); transition: transform 0.15s ease;">
          <div style="margin-bottom: 8px;">
            <span style="display: inline-block; background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-size: 0.78rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
              🏷️ PRACTICE UPI SIMULATION
            </span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="font-size: 1.5rem;">${riskIcon}</span>
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-navy); margin: 0;">
                  ${this.escapeHtml(txn.recipient_name)}
                </h3>
              </div>
              <div style="font-size: 0.95rem; color: var(--text-muted);">
                UPI ID: <span style="font-family: monospace; font-weight: 600; color: var(--text-main);">${this.escapeHtml(txn.upi_id)}</span>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 1.6rem; font-weight: 900; color: ${txn.status === 'Completed' ? 'var(--primary-navy)' : '#64748B'};">
                ${this.escapeHtml(txn.amount)}
              </div>
              <span class="status-pill ${statusClass}" style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 0.82rem; font-weight: 800; text-transform: uppercase;">
                ${this.escapeHtml(txn.status)}
              </span>
            </div>
          </div>

          <!-- Meta Details Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; background: #F8FAFC; border-radius: var(--radius-md); padding: 12px 16px; margin-bottom: 14px; font-size: 0.92rem;">
            <div>
              <span style="color: var(--text-muted); display: block;">Reference ID:</span>
              <span style="font-family: monospace; font-weight: 700; color: var(--text-main);">${this.escapeHtml(txn.txn_ref)}</span>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Date & Time:</span>
              <span style="font-weight: 600; color: var(--text-main);">${this.escapeHtml(txn.date_time)}</span>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Purpose:</span>
              <span style="font-weight: 600; color: var(--text-main);">${this.escapeHtml(txn.purpose)}</span>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block;">Recipient Verification:</span>
              <span style="font-weight: 700; color: #D97706;">${this.escapeHtml(txn.verification_status)}</span>
            </div>
          </div>

          ${txn.warning_signs ? `
            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 8px 12px; border-radius: 4px; font-size: 0.9rem; color: #991B1B; margin-bottom: 12px;">
              <strong>⚠️ Warning Signs:</strong> ${this.escapeHtml(txn.warning_signs)}
            </div>
          ` : ''}

          <!-- Risk Level -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-size: 0.88rem; color: var(--text-muted);">Safety Assessment: </span>
              <span class="warning-badge-pill ${riskBadgeClass}" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; font-size: 0.85rem; font-weight: 800; border-radius: 999px;">
                ${riskBadgeText}
              </span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  readSummaryAloud() {
    const title = document.getElementById('txnHistoryTitle');
    const titleText = title ? title.textContent.trim() : 'Transaction History & Safety Insights';
    const count = this.statCompletedCount ? this.statCompletedCount.textContent.trim() : '0';
    const total = this.statCompletedTotal ? this.statCompletedTotal.textContent.trim() : '0 rupees';
    const risky = this.statRiskyCount ? this.statRiskyCount.textContent.trim() : '0';

    const speechText = `${titleText}. You have ${count} successful demonstration payments totaling ${total}. ${risky} transactions had safety warnings. Remember, all transactions shown are demonstration payments only. No real money was moved.`;

    if (window.voiceEngine && typeof window.voiceEngine.speak === 'function') {
      if (this.btnStopAudio) this.btnStopAudio.style.display = 'inline-flex';
      window.voiceEngine.speak(speechText, () => {
        if (this.btnStopAudio) this.btnStopAudio.style.display = 'none';
      });
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.txnHistoryManager = new TransactionHistoryManager();
});
