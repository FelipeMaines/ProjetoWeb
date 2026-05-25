import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <span class="brand-mark"></span>
          <div>
            <p class="brand-kicker">Synkra AIOX</p>
            <h1>JWT Decoder</h1>
          </div>
        </div>
        <div class="topbar-note">Local-first · Angular · TypeScript</div>
      </header>

      <main class="content-shell">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .app-shell {
        min-height: 100vh;
        padding: 24px;
      }

      .topbar {
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 16px;
        margin: 0 auto 24px;
        max-width: 1440px;
      }

      .brand {
        align-items: center;
        display: flex;
        gap: 14px;
      }

      .brand-mark {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        background: linear-gradient(135deg, #5dd6c0, #60a5fa);
        box-shadow: 0 0 0 6px rgba(93, 214, 192, 0.12);
      }

      .brand-kicker {
        color: #5dd6c0;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.16em;
        margin: 0 0 3px;
        text-transform: uppercase;
      }

      h1 {
        color: #e8eefc;
        font-size: 1.15rem;
        margin: 0;
      }

      .topbar-note {
        color: #9aa8c7;
        font-size: 0.9rem;
        font-weight: 600;
      }

      .content-shell {
        margin: 0 auto;
        max-width: 1440px;
      }

      @media (max-width: 720px) {
        .app-shell {
          padding: 16px;
        }

        .topbar {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
