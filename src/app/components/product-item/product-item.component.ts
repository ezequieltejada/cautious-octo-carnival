import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  template: `
    <li class="product-item">
      <div class="product-item__image">
        <ng-content select="img"></ng-content>
      </div>
      <div class="product-item__content">
        <div class="product-item__title">
          <ng-content select="h3"></ng-content>
        </div>
        <div class="product-item__description">
          <ng-content select="p"></ng-content>
        </div>
        <div class="product-item__price">
          <ng-content select="span"></ng-content>
        </div>
      </div>
    </li>
  `,
  styles: `
    :host {
      display: block;
      border: 1px solid black;
      border-radius: 10px;
      width: clamp(300px, 100%, 500px);
      & ::ng-deep p {
        margin: 0;
      }

      & .product-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        align-items: center;

        & .product-item__image {
          width: 100px;
          height: 100px;
          overflow: hidden;
          
          & ::ng-deep img {
            width: 100%;
            object-fit: cover;
          }
        }

        & .product-item__content {
          display: grid;
          grid-template-rows: auto auto auto;
          gap: 5px;

          & .product-item__title {
            & ::ng-deep h3 {
              display: inline-block;
            }
            & .heart {
              font-size: 2rem;
              margin-left: 10px;
            }
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

}
